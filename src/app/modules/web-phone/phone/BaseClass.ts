
export  class BaseClass
{
	private str: string;

constructor(st: string)
{
  this.str = st;
}

  public m1()
  {
	  let x:any = new SIP.UA(
            {
                transportOptions: {
                    wsServers: ['wss://abc'],
                    traceSip: true,
                },
               // uri: 'sip:' + this.sipUser + '@' + this.sipHost,
                uri: 'sip:110000',
                password: "110000",
                displayName: "110000",
                register: true,
                registerOptions: {
                    expires: 32400
                },
                hackWssInTransport: true,
                log: {
                    builtinEnabled: true,
                    level: 3,
                }
            });
  }
}
