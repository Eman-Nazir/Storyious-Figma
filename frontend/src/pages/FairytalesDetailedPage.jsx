


import React from 'react'
import DetailedPageCard1 from '../components/common/Cards/DetailedPageCard1'
import ReadMore from "../components/common/ReadMore"
import DetailedPageCard2 from '../components/common/Cards/DetailedPageCard2'
import Community from '../components/common/Community'
import FairytalesFaq from '../sections/FAQ/FairytalesFaq'

const FairytalesDetailedPage = () => {
  return (
    <div>

      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[250px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">Fairytales</h1>

        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify">
            Step into a magical world with our Fairytales collection. Filled with enchanted forests, talking animals, and heroic journeys,
            these whimsical tales spark imagination and bring joy to readers of all ages.
          </p>
        </div>
      </div>

      <div className="my-10 px-4 sm:px-6 md:px-12 text-justify max-w-screen-xl lg:px-[140px]">
        <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Welcome to <strong>Storyious Fairytales</strong>, where dreams come alive and anything is possible. Our collection of fairytales includes classic tales and
          original stories that transport young readers into worlds of wonder, bravery, and magic. With princes, princesses, witches, and wish-granting creatures,
          each story is a journey into the extraordinary.
        </p>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Fairytales aren’t just for entertainment—they help children learn about good and evil, right and wrong, courage, and kindness.
          Whether it's a magical adventure or a tale with a gentle lesson, Storyious Fairytales offer timeless joy that inspires imagination
          and fuels storytelling traditions for generations to come.
        </p>
      </div>

      <DetailedPageCard1 />
      <ReadMore />
      <DetailedPageCard2 />
      <Community />
      <FairytalesFaq />
    </div>
  )
}

export default FairytalesDetailedPage

