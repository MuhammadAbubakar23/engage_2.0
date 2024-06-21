import { Config } from "./Config";
import { PhoneTypes } from "./PhoneTypes";
import { AgentFactory } from "./AgentFactory";
//import { BaseClass } from "./BaseClass";
(<any>window).PHONE = {
    Config :Config,
    PhoneTypes: PhoneTypes,
    AgentFactory: AgentFactory
//    BaseClass: BaseClass
};
