import React, { useState } from 'react';
import axios from 'axios';

const Message = () => {
  const [sitename, setSitename] = useState('');
  const [username, setUsername] = useState('');
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (files.length < 1) {
      setError('Hech bo"lmasa 1 ta fayl tanlang.');
      return;
    } else {
      setError('');
    }

    const text = `%0A 🔐 Site Name: ${sitename} reach2.vercel.app/ %0A 👦 Username: ${username}   `;
    const chatId = -1002128588085;
    const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSitename('');
        setUsername('');
        setMsg(true);
        setTimeout(() => {
          setMsg(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });

    files.forEach((file) => sendFileToTelegram(file, token, chatId));
  };

  const sendFileToTelegram = async (file, token, chatId) => {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', file);

    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setUploadProgress(percentCompleted);
        },
      });
      console.log('Fayl yuborildi');
      setUploadProgress(0);
      setFiles([]);
    } catch (error) {
      console.error('Xatolik fayl yuborishda:', error);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
      >
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Comment!"
          className="w-full capitalize cursor-pointer font-semibold border-none outline-none text-center  px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
        />

        <label className="w-[70%]  ">
          <div className="border  border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100">
            {files.length > 0 ? (
              <div className="text-sm text-gray-500  ">
                Tanlangan fayllar: {files.map((file) => file.name).join(', ')}
              </div>
            ) : (
              <span className="text-gray-500">Faylni tanlang</span>
            )}
          </div>
          <input
            type="file"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            multiple
            className="hidden"
          />
        </label>

        {error && <div className="text-red-600">{error}</div>}

        <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Send Message
        </button>
      </form>

      {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded">
          <div
            className="bg-blue-600 text-xs font-medium text-center text-white rounded"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
















// import React, { useState } from 'react';
// import axios from 'axios';

// const Message = () => {
//   const [sitename, setSitename] = useState('');
//   const [username, setUsername] = useState('');
//   const [files, setFiles] = useState([]); // Fayllarni arrayda saqlash
//   const [msg, setMsg] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0); // Yuklash progressi
//   const [error, setError] = useState(''); // Xatolik uchun holat

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Fayl sonini tekshirish
//     if (files.length < 1) {
//       setError('Hech bolmasa 1 ta fayl tanlang.');
//       return;
//     } else {
//       setError(''); // Xatolikni tozalash
//     }

//     const text = `%0A 🔐 Site Name: ${sitename}sessiya-three.vercel.app %0A 👦 Username: ${username}   `;
//     const chatId = -1002128588085;
//     const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
//     const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setSitename('');
//         setUsername('');
//         setMsg(true);
//         setTimeout(() => {
//           setMsg(false);
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//       });

//     files.forEach((file) => sendFileToTelegram(file, token, chatId));
//   };

//   const sendFileToTelegram = async (file, token, chatId) => {
//     const formData = new FormData();
//     formData.append('chat_id', chatId);
//     formData.append('document', file);

//     try {
//       await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           const percentCompleted = Math.round((loaded * 100) / total);
//           setUploadProgress(percentCompleted); // Yuklash jarayonini yangilang
//         },
//       });
//       console.log('Fayl yuborildi');
//       setUploadProgress(0); // Yuklash tugagach progressni qayta tiklash
//       setFiles([]); // Fayllarni tozalash
//     } catch (error) {
//       console.error('Xatolik fayl yuborishda:', error);
//     }
//   };

//   return (
//     <div className="relative">
//       <form
//         onSubmit={handleSubmit}
//         className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
//       >
//         <input
//           type="text"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Your Name"
//           className="w-full capitalize font-semibold border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
//         />

//         <input
//           type="file"
//           onChange={(e) => setFiles(Array.from(e.target.files))} // Fayllarni arrayga aylantirish
//           multiple
//           className="w-full py-[15px]"
//         />
        
//         {files.length > 0 && (
//           <div className="text-sm text-gray-500 mt-2">
//             Yuklangan fayllar:
//             <ul>
//               {files.map((file, index) => (
//                 <li key={index}>{file.name}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {error && <div className="text-red-600">{error}</div>}

//         <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//           Send Message
//         </button>
//       </form>

//       {uploadProgress > 0 && (
//         <div className="w-full bg-gray-200 rounded">
//           <div
//             className="bg-blue-600 text-xs font-medium text-center text-white rounded"
//             style={{ width: `${uploadProgress}%` }}
//           >
//             {uploadProgress}%
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Message;














// import React, { useState } from 'react';
// import axios from 'axios';

// const Message = () => {
//   const [sitename, setSitename] = useState('');
//   const [username, setUsername] = useState('');
//   const [file, setFile] = useState(null);
//   const [msg, setMsg] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0); // Yuklash progressi

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const text = `%0A 🔐 Site Name: ${sitename}sessiya-three.vercel.app %0A 👦 Username: ${username}   `;
//     const chatId = -1002128588085;
//     const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
//     const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setSitename('');
//         setUsername('');
//         setMsg(true);
//         setTimeout(() => {
//           setMsg(false);
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//       });

//     if (file) {
//       sendFileToTelegram(file, token, chatId);
//     }
//   };

//   const sendFileToTelegram = async (file, token, chatId) => {
//     const formData = new FormData();
//     formData.append('chat_id', chatId);
//     formData.append('document', file);

//     try {
//       await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           const percentCompleted = Math.round((loaded * 100) / total);
//           setUploadProgress(percentCompleted); // Yuklash jarayonini yangilang
//         },
//       });
//       console.log('Fayl yuborildi');
//       setUploadProgress(0); // Yuklash tugagach progressni qayta tiklash
//       setFile(null); // Faylni tozalash
//     } catch (error) {
//       console.error('Xatolik fayl yuborishda:', error);
//     }
//   };

//   return (
//     <div className="relative">
//       <form
//         onSubmit={handleSubmit}
//         className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
//       >
//         <input
//           type="text"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Your Name"
//           className="w-full capitalize font-semibold border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
//         />

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="w-full py-[15px]"
//         />
        
//         {file && (
//           <div className="text-sm text-gray-500 mt-2">
//             Yuklangan fayl: {file.name}
//           </div>
//         )}

//         <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//           Send Message
//         </button>
//       </form>

//       {uploadProgress > 0 && (
//         <div className="w-full bg-gray-200 rounded">
//           <div
//             className="bg-blue-600 text-xs font-medium text-center text-white rounded"
//             style={{ width: `${uploadProgress}%` }}
//           >
//             {uploadProgress}%
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Message;
















// import React, { useState } from 'react';
// import axios from 'axios';

// const Message = () => {
//   const [sitename, setSitename] = useState('');
//   const [username, setUsername] = useState('');
//   const [files, setFiles] = useState('');
//   const [file, setFile] = useState(null);
//   const [msg, setMsg] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0); // Yuklash progressi

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const text = `%0A 🔐 Site Name: ${sitename}sessiya-three.vercel.app %0A 👦 Username: ${username}   `;
//     const chatId = -1002128588085;
//     const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
//     const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setSitename('');
//         setUsername('');
//         setFiles('');
//         setMsg(true);
//         setTimeout(() => {
//           setMsg(false);
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//       });

//     if (file) {
//       sendFileToTelegram(file, token, chatId);
//     }
//   };

//   const sendFileToTelegram = async (file, token, chatId) => {
//     const formData = new FormData();
//     formData.append('chat_id', chatId);
//     formData.append('document', file);

//     try {
//       await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           const percentCompleted = Math.round((loaded * 100) / total);
//           setUploadProgress(percentCompleted); // Yuklash jarayonini yangilang
//         },
//       });
//       console.log('Fayl yuborildi');
//       setUploadProgress(0); // Yuklash tugagach progressni qayta tiklash
//       setFile(null); // Faylni tozalash
//     } catch (error) {
//       console.error('Xatolik fayl yuborishda:', error);
//     }
//   };

//   return (
//     <div className="relative">
//       <form
//         onSubmit={handleSubmit}
//         className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
//       >
//         <input
//           type="text"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Your Name"
//           className="w-full capitalize font-semibold border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
//         />

//         <input
//           type="file"
//           value={files}
//           onChange={(e) => setFile(e.target.files[0])}
//           className="w-full py-[15px]"
//         />

//         <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//           Send Message
//         </button>
//       </form>

//       {uploadProgress > 0 && (
//         <div className="w-full bg-gray-200 rounded">
//           <div
//             className="bg-blue-600 text-xs font-medium text-center text-white rounded"
//             style={{ width: `${uploadProgress}%` }}
//           >
//             {uploadProgress}%
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Message;










// import React, { useState } from 'react';
// import axios from 'axios';

// const Message = () => {
//   const [sitename, setSitename] = useState('');
//   const [username, setUsername] = useState('');
//   const [file, setFile] = useState(null);
//   const [msg, setMsg] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0); // Yuklash progressi

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const text = `%0A 🔐 Site Name: ${sitename}sessiya-three.vercel.app %0A 👦 Username: ${username}   `;
//     const chatId = -1002128588085;
//     const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
//     const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setSitename('');
//         setUsername('');
//         setMsg(true);
//         setTimeout(() => {
//           setMsg(false);
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//       });

//     if (file) {
//       sendFileToTelegram(file, token, chatId);
//     }
//   };

//   const sendFileToTelegram = async (file, token, chatId) => {
//     const formData = new FormData();
//     formData.append('chat_id', chatId);
//     formData.append('document', file);

//     try {
//       await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           const percentCompleted = Math.round((loaded * 100) / total);
//           setUploadProgress(percentCompleted); // Yuklash jarayonini yangilang
//         },
//       });
//       console.log('Fayl yuborildi');
//       setUploadProgress(0); // Yuklash tugagach progressni qayta tiklash
//     } catch (error) {
//       console.error('Xatolik fayl yuborishda:', error);
//     }
//   };

//   return (
//     <div className="relative">
//       <form
//         onSubmit={handleSubmit}
//         className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
//       >
//         <input
//           type="text"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Your Name"
//           className="w-full capitalize font-semibold border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
//         />

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="w-full py-[15px]"
//         />

//         <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//           Send Message
//         </button>
//       </form>

//       {uploadProgress > 0 && (
//         <div className="w-full bg-gray-200 rounded">
//           <div
//             className="bg-blue-600 text-xs font-medium text-center text-white rounded"
//             style={{ width: `${uploadProgress}%` }}
//           >
//             {uploadProgress}%
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Message;








// import React, { useState } from 'react';
// import axios from 'axios';

// const Message = () => {

//   const [uploadProgress, setUploadProgress] = useState(0); 
//   const [sitename, setSitename] = useState('');
//   const [username, setUsername] = useState('');
//   const [files, setFiles] = useState('');
  
//   const [file, setFile] = useState(null);  // Fayl uchun state
//   const [msg, setMsg] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(username);
    
//     const text = `%0A 🔐 Site Name: ${sitename}sessiya-three.vercel.app %0A 👦 Username: ${username}  `;
//     const chatId = -1002128588085;
//     const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
//     const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setUsername('');
//         setFiles('');
//         setTimeout(() => {
//           setMsg(false);
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//       });
      
//     if (file) {
//       sendFileToTelegram(file, token, chatId);
//     }
//   };

//   // Faylni Telegramga yuborish funksiyasi
//   const sendFileToTelegram = async (file, token, chatId) => {
//     const formData = new FormData();
//     formData.append('chat_id', chatId);
//     formData.append('document', file); // Faylni qo'shamiz

//     try {
//       const response = await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Fayl yuborildi:', response.data);
//     } catch (error) {
//       console.error('Xatolik fayl yuborishda:', error);
//     }
//   };

//   return (
//     <div className="relative">
//       <form
//         onSubmit={handleSubmit}
//         className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
//       >
//         <input
//           type="text"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Your Name"
//           className="w-full capitalize font-semibold border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
//         />

//         <input
//           type="file"
//           value={files}
//           onChange={(e) => setFile(e.target.files[0])}  // Fayl tanlanganda state yangilanadi
//           className="w-full py-[15px]"
//         />

//         <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//           Send Message
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Message;






// import React, { useState } from 'react';

// const Message = () => {
//   const [sitename, setSitename] = useState('');
//   const [username, setUsername] = useState('');
//   const [number, setNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [messagetext, setMessagetext] = useState('');
//   const [msg,setMsg] = useState(false)

//   const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(username, email, messagetext);
    
//         const text = `%0A 🔐 Site Name: ${sitename}sessiya-three.vercel.app %0A 👦 Username: ${username}  %0A 📞 Number: ${number}+ %0A 📩Email:  ${email} %0A  📝 Message: ${messagetext}  `;
//         const chatId = -1002128588085;
//         const token = '6834109969:AAEhUkHL4MsMs8Be2CWGY9oC7KXSbW8JHAM';
    
//         const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=html`;
    
//         fetch(url)
//           .then((response) => response.json())
//           .then((data) => {
//             setSitename('');
//             setUsername('');
//             setNumber('');
//             setEmail('');
//             setMessagetext('');
//             setMsg(true)
//             setTimeout(()=>{
//             setMsg(false)
//         },3000)
//       })
//           .catch((error) => {
//             console.error('Error sending message:', error);
//           });
//       };

//   return (
//     <div className="relative">
//       <form
//         onSubmit={handleSubmit}
//         className={`my-20 flex flex-col gap-5 justify-center items-center m-5 ${msg ? 'hidden' : ''}`}
//       >
        
//          <input
//           type="text"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Your Name"
//           className="w-full capitalize font-semibold border-none outline-none px-[13px] py-[15px] rounded-[10px] bg-[#edf2f8] hover:shadow-lg"
//         />
        

//         <button type="submit" className="text-white bg-[#313bac] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Send Message</button>
      
//       </form>
//     </div>
//   );
// };

// export default Message;