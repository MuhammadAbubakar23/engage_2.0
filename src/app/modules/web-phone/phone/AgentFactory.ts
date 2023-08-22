import { AgentAvayaPhoneImp } from "./AgentAvayaPhoneImp";
import { Agent } from "./Agent";
import { Config } from "./Config";
import { PhoneTypes } from "./PhoneTypes";
import { AgentAsteriskImp } from "./AgentAsteriskImp";
import { AgentAsteriskWsImp } from "./AgentAsteriskWsImp";

export class AgentFactory
{

    public static getAgent(conf: Config)
    {
        let agent: Agent | null = null;

        switch (conf.phoneType)
        {
            case PhoneTypes.Avaya_PHONE:
                agent = new AgentAvayaPhoneImp(conf);
                break;

            case PhoneTypes.CCM_PHONE:
                agent = new AgentAsteriskImp(conf);
                break;

            case PhoneTypes.CCMS_WS_PHONE:
                agent = new AgentAsteriskWsImp(conf);
                break;
        }

        return agent;
    }

}
