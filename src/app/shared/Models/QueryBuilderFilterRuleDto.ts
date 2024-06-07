interface Rule {
    condition: string;
    field: string;
    id: string;
    input: string;
    operator: string;
    rules: Rule[];
    type: string;
    value: string[];
  }
  interface QueryBuilderFilterRuleDto {
    id: string;
    condition: string;
    field: string;
    input: string;
    operator: string;
    type: string;
    value: string[];
    rules: Rule[];
  }
  interface CompleteDataToSend {
    formData: {
      ruleName: string;
      description: string;
    };
    queryData: {
      query: QueryBuilderFilterRuleDto;
      query1: QueryBuilderFilterRuleDto;
    };
  }
  