// import React from 'react'

// export const ProfileBeaches = ({ favorites, unSave }) => {
//   if (!favorites) {
//     return <h2>Du har ännu inte sparat någon favorit</h2>
//   }
//   return (
//     <div>
//       <div className="favorite-list">
//         <h3>Favoriter</h3>
//         <div className="favorite-card">
//           {favorites &&
//             favorites.map((favorite) => (
//               <div key={favorite} className="favorite-box">
//                 <p className="favorite-text">{favorite}</p>
//                 <div>
//                   {unSave && (
//                     <button
//                       className="delete-button"
//                       type="button"
//                       onClick={() => {
//                         unSave(favorite.id)
//                       }}
//                     >
//                       OGILLA
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   )
// }
