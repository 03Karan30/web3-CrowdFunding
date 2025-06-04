// import React, { useState } from 'react';
// import { useStateContext } from '../context';
// import { ethers } from 'ethers';

// const CampaignCard = ({ campaign, handleClick, isOwner = false }) => {
//   const { deleteCampaign, deleteCampaignWithRefund, address } = useStateContext();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [showDeleteOptions, setShowDeleteOptions] = useState(false);

//   const handleDelete = async (withRefund = false) => {
//     if (!window.confirm(`Are you sure you want to delete this campaign${withRefund ? ' and refund all donors' : ''}?`)) {
//       return;
//     }

//     setIsDeleting(true);
//     try {
//       if (withRefund) {
//         await deleteCampaignWithRefund(campaign.pId);
//       } else {
//         await deleteCampaign(campaign.pId);
//       }
      
//       alert('Campaign deleted successfully!');
//       // Refresh the page or update the campaigns list
//       window.location.reload();
//     } catch (error) {
//       console.error('Error deleting campaign:', error);
//       alert('Error deleting campaign. Please try again.');
//     }
//     setIsDeleting(false);
//     setShowDeleteOptions(false);
//   };

//   const remainingDays = () => {
//     const difference = new Date(campaign.deadline).getTime() - Date.now();
//     return Math.max(0, Math.ceil(difference / (1000 * 3600 * 24)));
//   };

//   // Format amount from raw blockchain units to ETH string with 4 decimals
//   const formatEthAmount = (amount) => {
//     try {
//       if (!amount) return '0.0000';
//       return parseFloat(ethers.utils.formatEther(amount.toString())).toFixed(4);
//     } catch {
//       return '0.0000';
//     }
//   };

//   return (
//     <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer relative">
//       {/* Delete button for campaign owner */}
//       {isOwner && campaign.owner.toLowerCase() === address.toLowerCase() && (
//         <div className="absolute top-2 right-2 z-10">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowDeleteOptions(!showDeleteOptions);
//             }}
//             className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full text-sm"
//             disabled={isDeleting}
//           >
//             🗑️
//           </button>
          
//           {showDeleteOptions && (
//             <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(false);
//                 }}
//                 className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
//                 disabled={isDeleting || parseFloat(campaign.amountCollected) > 0}
//               >
//                 {parseFloat(campaign.amountCollected) > 0 ? 'Cannot delete (has donations)' : 'Delete Campaign'}
//               </button>
              
//               {parseFloat(campaign.amountCollected) > 0 && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(true);
//                   }}
//                   className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
//                   disabled={isDeleting}
//                 >
//                   Delete & Refund Donors
//                 </button>
//               )}
              
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowDeleteOptions(false);
//                 }}
//                 className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       <div onClick={handleClick}>
//         <img 
//           src={campaign.image} 
//           alt="fund" 
//           className="w-full h-[158px] object-cover rounded-[15px]"
//         />

//         <div className="flex flex-col p-4">
//           <div className="block">
//             <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
//               {campaign.title}
//             </h3>
//             <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
//               {campaign.description}
//             </p>
//           </div>

//           <div className="flex justify-between flex-wrap mt-[15px] gap-2">
//             <div className="flex flex-col">
//               <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
//                 {formatEthAmount(campaign.amountCollected)}
//               </h4>
//               <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
//                 Raised of {formatEthAmount(campaign.target)}
//               </p>
//             </div>
//             <div className="flex flex-col">
//               <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
//                 {remainingDays()}
//               </h4>
//               <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
//                 Days Left
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center mt-[20px] gap-[12px]">
//             <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
//               <img 
//                 src="/assets/thirdweb.png" 
//                 alt="user" 
//                 className="w-1/2 h-1/2 object-contain"
//               />
//             </div>
//             <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
//               by <span className="text-[#b2b3bd]">{campaign.owner}</span>
//             </p>
//           </div>
//         </div>
//       </div>
      
//       {isDeleting && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-[15px]">
//           <div className="text-white">Deleting...</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CampaignCard;
