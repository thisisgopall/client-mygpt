import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { useMutation } from "react-query"; // it makes the process of tracking the loading state, the final state
//and any pending state and it also manages even the cashier for you. So it manages all these interaction with
// the backend by itself. We don't have to write a lot of view states.

import { fetchResponse } from "./api";

/// In order to use react query which is to set the query client as a wrapper of our whole applications

function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]), /// Empty lines on the start of message then they should be replace those with empty string
  });

  const sendMessage = async (message) => {
    // taking previous value as prop and destructuring the previous value and adding new message
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };
  
  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between  align-middle">
      {/* py means padding in vertical in tailwindcss */}
      {/* gradients */}
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>

      {/* header */}
      <div className="uppercase font-bold  text-2xl text-center mb-3">
        myGPT
      </div>

      {/* body */}
      <div
        className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md
      "
      >
        {/* we have to provide our all chats to our chat body */}
        <ChatBody chat={chat} />   
      </div>

      {/* input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
}

export default App;
