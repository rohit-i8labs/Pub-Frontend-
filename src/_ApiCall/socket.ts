import { restVarId } from './restaurant';
const createPrivateSocket = async (token: string|null,chatId: string): Promise<WebSocket> => {
    const wsPrivateUrl = `ws://13.51.200.230/ws/private/${chatId}`;
    return new WebSocket(`${wsPrivateUrl}/${token}/`);
}
const createGroupSocket = async (token: string|null): Promise<WebSocket> => {
  const restaurantVarId = await restVarId();
  const wsGroupUrl =  `ws://13.51.200.230/ws/group/1/${restaurantVarId}`;
  return new WebSocket(`${wsGroupUrl}/${token}/`);
  };

export {
    createPrivateSocket,
    createGroupSocket,
}