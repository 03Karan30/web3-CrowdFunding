import React, { useState } from 'react';
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({ 
  owner, 
  title, 
  description, 
  target, 
  deadline, 
  amountCollected, 
  image, 
  handleClick,
  category = "Education" // Default category
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const remainingDays = daysLeft(deadline);
  const progressPercentage = target > 0 ? Math.min((amountCollected / target) * 100, 100) : 0;
  const isUrgent = remainingDays <= 7 && remainingDays > 0;
  const isExpired = remainingDays <= 0;
  
  const formatAmount = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount}`;
  };

  return (
    <div 
      className="group sm:w-[288px] w-full h-[480px] rounded-2xl bg-gradient-to-br from-[#1c1c24] to-[#2a2a35] cursor-pointer border border-[#3a3d42] hover:border-[#1dc071] transition-all duration-300 hover:shadow-2xl hover:shadow-[#1dc071]/10 overflow-hidden flex flex-col"
      onClick={handleClick}
    >
      {/* Image Container - Fixed Height */}
      <div className="relative h-[180px] bg-gradient-to-br from-[#2c2f32] to-[#1c1c24] overflow-hidden">
        {!imageError ? (
          <div className="w-full h-full overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-[#3a3d42] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#808191]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c2f32] via-[#3a3d42] to-[#2c2f32] animate-pulse"></div>
        )}
        
        {/* Status Badge */}
        {isExpired && (
          <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            Expired
          </div>
        )}
        {isUrgent && !isExpired && (
          <div className="absolute top-3 right-3 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full animate-pulse">
            Urgent
          </div>
        )}
        
        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1dc071]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container - Flexible Height */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category Tag */}
        <div className="flex items-center mb-3">
          <div className="flex items-center bg-[#1dc071]/10 px-3 py-1.5 rounded-full">
            <img src={tagType} alt="category" className="w-3.5 h-3.5 object-contain"/>
            <p className="ml-2 font-epilogue font-medium text-xs text-[#1dc071]">{category}</p>
          </div>
        </div>

        {/* Title and Description - Flexible */}
        <div className="flex-1 mb-4">
          <h3 className="font-epilogue font-bold text-base text-white leading-5 mb-2 line-clamp-2 group-hover:text-[#1dc071] transition-colors duration-300">
            {title}
          </h3>
          <p className="font-epilogue font-normal text-sm text-[#808191] leading-5 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-epilogue text-[#808191]">Progress</span>
            <span className="text-xs font-epilogue font-semibold text-[#1dc071]">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-[#3a3d42] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#1dc071] to-[#16a461] h-2 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stats - Fixed Position */}
        <div className="flex justify-between items-start mb-4 gap-3">
          <div className="flex-1">
            <div className="bg-[#2c2f32] rounded-lg p-3 text-center border border-[#3a3d42] group-hover:border-[#1dc071]/30 transition-colors duration-300">
              <h4 className="font-epilogue font-bold text-sm text-white leading-4">
                {formatAmount(amountCollected)}
              </h4>
              <p className="mt-1 font-epilogue font-normal text-xs text-[#808191]">
                of {formatAmount(target)}
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-[#2c2f32] rounded-lg p-3 text-center border border-[#3a3d42] group-hover:border-[#1dc071]/30 transition-colors duration-300">
              <h4 className={`font-epilogue font-bold text-sm leading-4 ${
                isExpired ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-white'
              }`}>
                {remainingDays}
              </h4>
              <p className="mt-1 font-epilogue font-normal text-xs text-[#808191]">
                Days Left
              </p>
            </div>
          </div>
        </div>

        {/* Owner Info - Fixed at Bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-[#3a3d42] group-hover:border-[#1dc071]/30 transition-colors duration-300">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1dc071] to-[#16a461] flex justify-center items-center p-0.5 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#13131a] flex justify-center items-center">
                <img src={thirdweb} alt="creator" className="w-4 h-4 object-contain"/>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-epilogue font-normal text-xs text-[#808191]">
                Created by
              </p>
              <p className="font-epilogue font-medium text-sm text-[#b2b3bd] truncate">
                {owner}
              </p>
            </div>
          </div>
          
          {/* Subtle Action Indicator */}
          <div className="opacity-50 group-hover:opacity-100 group-hover:text-[#1dc071] transition-all duration-300 flex-shrink-0 ml-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundCard;