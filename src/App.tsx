import { useState } from "react";
import { CombinatorType, combinators, Expression } from "./schemas/expression";
import { v4 as uuidv4 } from 'uuid';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormSelect from "react-bootstrap/FormSelect";
import ExpressionItem from "./ExpressionItem";
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

interface Expressions {
  rules: Array<Expression>,
  combinator: CombinatorType
}


function App() {

  const [open, setOpen] = useState<boolean>(false)
  const [expressions, setExpressions] = useState<Expressions>({
    rules: [{ id: '1', key: 'age', output: { operator: '<=', score: 20, value: 200 } }],
    combinator: 'AND'
  });

  const addRule = () => {
    setExpressions({
      ...expressions,
      rules: [...expressions.rules, {
        id: uuidv4(),
        key: 'age',
        output: {
          operator: '<',
          score: 0,
          value: 0
        }
      }]
    });
  };

  const deleteRule = (index: number) => {
    const newRules = expressions.rules.filter((_, i) => i !== index);
    setExpressions({ ...expressions, rules: newRules });
  };


  const updateRule = (index: number, expression: Expression) => {
    const newRules = expressions.rules.map((existringExpression, i) => (i === index) ? expression : existringExpression);
    setExpressions({ ...expressions, rules: newRules });
  }


  return (
    <main>
      <h1 className="text-center mb-4">Crego Round 1 Assignment</h1>
      <Container>
        <Row className="text-center">
          <Col>Rule Type</Col>
          <Col>Operator</Col>
          <Col>Value</Col>
          <Col>Score</Col>
          <Col></Col>
        </Row>
        {
          expressions.rules.map((value, index) => (
            <ExpressionItem
              key={value.id}
              index={index}
              expression={value}
              updateRule={updateRule}
              deleteRule={deleteRule}
            />
          ))
        }
        <Row>
          <Col xs={4}>
            <FormSelect value={expressions.combinator} onChange={(event) => setExpressions({ ...expressions, combinator: event.target.value as CombinatorType })}>
              {combinators.map((value, index) => <option key={index} value={value}>{value}</option>)}
            </FormSelect>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={4}>
            <Button onClick={addRule} className="btn btn-primary">Add New Rule</Button>
          </Col>
          <Col xs={2}>
            <Button onClick={() => setOpen(!open)} className="btn btn-success">
              {(open) ? 'Hide' : 'Submit'}
            </Button>
          </Col>
        </Row>
        {open && (<Row className="mt-4">
          <JsonView data={expressions} shouldExpandNode={allExpanded} style={defaultStyles} />
        </Row>)}
      </Container>
    </main>
  )
}

export default App
