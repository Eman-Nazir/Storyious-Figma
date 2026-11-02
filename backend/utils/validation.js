import { z } from "zod";
import { ApiError } from "./ApiError.js";

const fail = (message, field) => {
  const error = new ApiError(400, message);

  if (field) {
    error.field = field;
  }

  throw error;
};

const requireBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    fail("Request body must be an object");
  }
};

export const readString = (
  value,
  field,
  {
    required = false,
    min = 0,
    max = 500,
    trim = true,
  } = {}
) => {
  if (value === undefined) {
    if (required) {
      fail(`${field} is required`, field);
    }

    return undefined;
  }

  if (typeof value !== "string") {
    fail(`${field} must be a string`, field);
  }

  const result = trim ? value.trim() : value;

  if (required && !result) {
    fail(`${field} is required`, field);
  }

  if (result.length < min || result.length > max) {
    fail(
      `${field} must contain ${min} to ${max} characters`,
      field
    );
  }

  return result;
};

export const validateEmail = (value) => {
  const email = readString(value, "email", {
    required: true,
    max: 254,
  }).toLowerCase();

  if (!z.string().email().safeParse(email).success) {
    fail("Please enter a valid email address", "email");
  }

  return email;
};

const validatePassword = (value, minimum) => {
  const password = readString(value, "password", {
    required: true,
    min: minimum,
    max: 72,
    trim: false,
  });

  if (!password.trim()) {
    fail("Password must not be blank", "password");
  }

  // bcrypt only uses the first 72 UTF-8 bytes.
  if (Buffer.byteLength(password, "utf8") > 72) {
    fail(
      "Password must not exceed 72 UTF-8 bytes",
      "password"
    );
  }

  return password;
};

export const validateSignup = (body) => {
  requireBody(body);

  const username = readString(body.username, "username", {
    required: true,
    min: 2,
    max: 30,
  });

  const email = validateEmail(body.email);
  const password = validatePassword(body.password, 8);

  const confirmPassword = readString(
    body.confirmPassword,
    "confirmPassword",
    {
      required: true,
      max: 72,
      trim: false,
    }
  );

  if (password !== confirmPassword) {
    fail("Passwords do not match", "confirmPassword");
  }

  return {
    username,
    email,
    password,
  };
};

export const validateLogin = (body) => {
  requireBody(body);

  // Preserve access to older accounts while bounding input size.
  const password = readString(body.password, "password", {
    required: true,
    min: 1,
    max: 256,
    trim: false,
  });

  if (!password.trim()) {
    fail("Password must not be blank", "password");
  }

  if (Buffer.byteLength(password, "utf8") > 1024) {
    fail("Password is too long", "password");
  }

  return {
    email: validateEmail(body.email),
    password,
  };
};

const submissionFields = {
  name: {
    required: true,
    min: 1,
    max: 100,
  },
  age: {
    max: 32,
  },
  city: {
    max: 100,
  },
  country: {
    max: 100,
  },
  qualification: {
    max: 150,
  },
  institution: {
    max: 200,
  },
  profession: {
    max: 150,
  },
  phone: {
    required: true,
    min: 7,
    max: 32,
  },
  about: {
    max: 5000,
  },
  reason: {
    max: 5000,
  },
};

export const validateSubmission = (
  body,
  { partial = false } = {}
) => {
  requireBody(body);

  const result = {};

  for (const [field, rules] of Object.entries(submissionFields)) {
    if (partial && !Object.hasOwn(body, field)) {
      continue;
    }

    const value = readString(body[field], field, rules);

    if (value !== undefined) {
      result[field] = value;
    }
  }

  if (!partial || Object.hasOwn(body, "email")) {
    result.email = validateEmail(body.email);
  }

  if (result.phone !== undefined) {
    const digits = result.phone.replace(/\D/g, "");

    if (
      !/^\+?[0-9().\s-]+$/.test(result.phone) ||
      digits.length < 7 ||
      digits.length > 15
    ) {
      fail("Please enter a valid phone number", "phone");
    }
  }

  if (partial && Object.keys(result).length === 0) {
    fail("Provide at least one valid submission field to update");
  }

  return result;
};