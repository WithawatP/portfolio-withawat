import React from 'react';
import Pill from './Pill';

export default function HoverTimelineCard({ role, company, period, description, skills = [], isLast }) {
  return (
    <div className="group flex gap-4 sm:gap-6 w-full mb-2">
      <div className="flex flex-col items-center mt-2">
        <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#E7E7E7] shadow-[4px_4px_8px_#b6b6b6,-4px_-4px_8px_#ffffff] transition-all duration-300 group-hover:shadow-[inset_2px_2px_4px_#b6b6b6,inset_-2px_-2px_4px_#ffffff]">
          <div className="h-2 w-2 rounded-full bg-[#9B9B9B] transition-opacity duration-300 group-hover:opacity-0" />
          <span className="absolute flex h-2.5 w-2.5 items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
        </div>
        {!isLast && <div className="w-[2px] flex-1 bg-[#d1d1d1] mt-3 mb-1 rounded-full opacity-50" />}
      </div>

      <div className="flex-1 bg-[#E7E7E7] rounded-[2rem] shadow-[inset_6px_6px_12px_#b6b6b6,inset_-6px_-6px_12px_#ffffff] p-6 mb-8 cursor-pointer transition-all duration-300 hover:shadow-[inset_8px_8px_16px_#b6b6b6,inset_-8px_-8px_16px_#ffffff]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h3 className="text-lg font-bold text-[#333333]">{role}</h3>
          <span className="text-sm font-medium text-[#9B9B9B]">{period}</span>
        </div>

        <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <div className="overflow-hidden">
            <div className="pt-4 mt-4 border-t border-[#d1d1d1]/50">
              <p className="text-base font-semibold text-[#333333] mb-3">{company}</p>
              <p className="text-[14px] leading-relaxed text-[#333333] mb-5">{description}</p>
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill, index) => (
                  <Pill key={index} className="!shadow-[inset_3px_3px_6px_#b6b6b6,inset_-3px_-3px_6px_#ffffff] !cursor-default px-4 py-1.5 text-[12px]">
                    {skill}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
