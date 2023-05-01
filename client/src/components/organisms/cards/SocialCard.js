import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-regular-svg-icons";

export default function SocialCard({ image, name, author, proimg }) {
  return (
    <div className="w-[14.5rem] h-[18.5rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="w-[14.5rem] h-[14.5rem] rounded-t-md bg-fadeBlack flex items-center">
        <img
          src={image}
          alt="recipeimg"
          className="w-full h-full rounded-t-md object-cover"
        ></img>
      </div>

      <div className={`bg-primary w-full h-[4rem] rounded-b-md p-[0.75rem] drop-shadow-md flex justify-between items-center`}>
        <div className="flex flex-col">

          <div className="flex flex-row items-center gap-2">
            <img src={proimg} className="w-[2.2rem] h-[2.1rem] border-black rounded-full" style={{
              border: '1px solid green',
            }}></img>


            <div className="flex flex-col">
              <label className="text-base font-normal tablet:font-[700] text-mainBlack mb-[0.125rem]">
                {name}
              </label>
              <label className="w-full text-sm font-light tablet:font-normal text-fadeBlack">
                {author}
              </label>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}
