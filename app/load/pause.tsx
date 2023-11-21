export const getData = async () => {

  const promise = await (new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 7000);
  
  }))
}