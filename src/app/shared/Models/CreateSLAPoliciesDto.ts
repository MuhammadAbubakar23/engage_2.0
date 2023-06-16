export class CreateSLAPoliciesDto {
  id: number = 0;
  companyId: number = 0;
  policyName: string = '';
  description: string = '';
  timeZone: string = '';
  slaTargets: SlaTargetsDto[] = [];
}

export class SlaTargetsDto {
  id: number = 0;
  priority: string = '';
  firstResponseTime: string = '';
  everyResponseTime: string = '';
  resolutionTime: string = '';
  isEscalated: boolean = false;
  oprationHoursId: number = 0;
}
