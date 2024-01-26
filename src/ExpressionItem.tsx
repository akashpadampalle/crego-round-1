import React, { useEffect, useState } from "react";
import { Expression, KeyType, OperatorType, keys, operators } from "./schemas/expression";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteForever } from 'react-icons/md'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import Button from "react-bootstrap/Button";


interface Props {
    index: number;
    expression: Expression;
    deleteRule: (index: number) => void;
    updateRule: (index: number, expression: Expression) => void;
}

const ExpressionItem: React.FC<Props> = ({ index, expression, updateRule, deleteRule }) => {

    const [key, setKey] = useState<KeyType>(expression.key);
    const [operator, setOperator] = useState<OperatorType>(expression.output.operator);
    const [value, setValue] = useState<number>(expression.output.value);
    const [score, setScore] = useState<number>(expression.output.score)

    // update
    useEffect(() => {
        const newExpression: Expression = { id: uuidv4(), key, output: { operator, value, score } };

        // Check if the values have changed before updating
        if (
            newExpression.key !== expression.key ||
            newExpression.output.operator !== expression.output.operator ||
            newExpression.output.value !== expression.output.value ||
            newExpression.output.score !== expression.output.score
        ) {
            updateRule(index, newExpression);
        }
    }, [index, key, operator, value, score, expression, updateRule]);



    return (
        <Row className="mb-2">
            <Col>
                <FormSelect value={key} onChange={(event) => setKey(event.target.value as KeyType)}>
                    {keys.map((k, i) => <option key={i} value={k}> {k} </option>)}
                </FormSelect>
            </Col>
            <Col>
                <FormSelect value={operator} onChange={(event) => setOperator(event.target.value as OperatorType)}>
                    {operators.map((o, i) => <option key={i} value={o}> {o} </option>)}
                </FormSelect>
            </Col>
            <Col>
                <FormControl
                    type="number"
                    value={value}
                    onChange={(event) => setValue(Number(event.target.value))}
                />
            </Col>
            <Col>
                <FormControl
                    type="number"
                    value={score}
                    onChange={(event) => setScore(Number(event.target.value))}
                />
            </Col>
            <Col>
                <Button className="btn btn-danger" onClick={() => deleteRule(index)}><MdDeleteForever /></Button>
            </Col>
        </Row>
    )
}

export default ExpressionItem