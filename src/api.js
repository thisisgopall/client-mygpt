export const fetchResponse = async (chat) => {
  try {
    // after depoloyment you should change the fetch URL below
    const response = await fetch("https://server-mygpt.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // when we are sendig request to any server we have to send our data as stringify json object.
        message: chat.map((message) => message.message).join(" \n "),
        // actually chat is coming as props.
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
