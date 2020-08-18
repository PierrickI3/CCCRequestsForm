export const raiseEvent = (eventName, customData) => {
  console.log('raiseEvent()');
  const message = {
    eventName: eventName,
    customData: customData,
  };
  window.parent.postMessage(message, '*');
};
