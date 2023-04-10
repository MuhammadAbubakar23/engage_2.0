export class GetAgentReportDto {
  agentId: number = 0;
  user: string = '';
  plateForm: string = '';
  pageNumber: number = 0;
  pageSize: number = 0;
  isAttachment: boolean = false;
}
