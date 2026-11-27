export const firebaseConfig = {
  apiKey: "AIzaSyARiMUuNFevJ8N_5YUFMUWQE6s9Nr46NbA",
  authDomain: "akstarglobal-4ae5a.firebaseapp.com",
  databaseURL: "https://akstarglobal-4ae5a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "akstarglobal-4ae5a",
  storageBucket: "akstarglobal-4ae5a.firebasestorage.app",
  messagingSenderId: "757697177375",
  appId: "1:757697177375:web:d3e46cf965750f5c5e722a",
  measurementId: "G-S7MZ2FR6R1"
};

export const firebaseEnabled = !Object.values(firebaseConfig).some(v => String(v).includes("YOUR_"));
