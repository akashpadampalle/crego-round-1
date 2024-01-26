
// keys
export const keys = ['age', 'credit_score', 'account_balance'] as const;
export type KeyType = typeof keys[number];


// operators
export const operators = ['<', '>', '=', '>=', '<='] as const;
export type OperatorType = typeof operators[number];

// combinator 
export const combinators = ['AND', 'OR'] as const;
export type CombinatorType = typeof combinators[number];

// expression
export interface Expression {
    id: string,
    key: KeyType,
    output: {
        value: number;
        operator: OperatorType;
        score: number
    }
}


