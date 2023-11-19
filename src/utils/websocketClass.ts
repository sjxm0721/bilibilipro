import { useAccountStore } from "@/stores/modules/account"

export interface message{
  messageId?:number,
  fromUid?:number,
  fromName?:string,
  fromAvatar?:string,
  toUid?:number,
  toName?:string,
  toAvatar?:string,
  content?:string,
  type?:string,
  videoId?:number,
  dynamicId?:number,
  commentId?:number,
  barrageId?:number,
  isAll?:boolean,
  isSystem:string,
  isRead?:string,
  videoPoster?:string,
  barrageText?:string,
  commentContent?:string,
  dynamicText?:string,
  postTime?:string,
  nowCommentId?:number
}

interface SocketOptions{
  heartbeatInterval?:number,
  reconnectInterval?:number,
  maxReconnectAttempts?:number
}

export default class WebSocketClass {
  url:string
  ws:WebSocket | null = null
  opts:SocketOptions
  reconnectAttempts:number = 0
  listeners:{[key:string]:Function[]}={}
  heartbeatInterval:number|null = null
  constructor(url:string,opts:SocketOptions = {}) {
    this.url = url
    this.opts={
      heartbeatInterval: 30000,
      reconnectInterval:5000,
      maxReconnectAttempts:5,
      ...opts
    }

      this.init()
  }
  init(){
    if(useAccountStore().myInfo?.uid !== undefined)
    {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = this.onOpen.bind(this)
      this.ws.onmessage = this.onMessage.bind(this)
      this.ws.onerror = this.onError.bind(this)
      this.ws.onclose = this.onClose.bind(this)
    }
  }

  onOpen(event:Event){
    this.reconnectAttempts = 0
    this.startHeartbeat()
    this.emit("open",event)
  }

  onMessage(event:MessageEvent){
    this.emit('message',event.data)
  }

  onError(event:Event){
    this.emit('error',event)
  }

  onClose(event:Event){
    this.stopHeartbeat()
    this.emit('close',event)

    if(this.reconnectAttempts < this.opts.maxReconnectAttempts!){
      setTimeout(()=>{
        this.reconnectAttempts++
        this.init()
      },this.opts.reconnectInterval)
    }
  }

  startHeartbeat(){
    if(!this.opts.heartbeatInterval) return
    this.heartbeatInterval = window.setInterval(()=>{
      if(this.ws?.readyState === WebSocket.OPEN){
        const message:message={isSystem:'1',content:'正在保持连接'}
        this.ws.send(JSON.stringify(message))
      }
    },this.opts.heartbeatInterval)
  }

  stopHeartbeat(){
    if(this.heartbeatInterval){
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  send(data: string){
    if(this.ws?.readyState === WebSocket.OPEN){
      this.ws.send(data)
    }else{
      console.error('Websocket关闭,发送消息失败',data)
    }
  }

  on(event:string,callback:Function){
    if(!this.listeners[event]){
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event:string){
    if(this.listeners[event]){
      delete this.listeners[event]
    }
  }

  emit(event:string,data:any){
    this.listeners[event]?.forEach(callback=>callback(data))
  }

  close(){
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
