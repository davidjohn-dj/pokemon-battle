import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Layout,
  Typography,
  List,
  Alert,
  Spin,
} from "antd";
import { getRandomPokemon, getRandomMove } from "./services/pokemonService";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [pokemonOne, setPokemonOne] = useState(null);
  const [pokemonTwo, setPokemonTwo] = useState(null);
  const [pokemonOneMove, setPokemonOneMove] = useState(null);
  const [pokemonTwoMove, setPokemonTwoMove] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [battleCount, setBattleCount] = useState(0);

  const fetchRandomPokemons = async () => {
    setLoading(true);
    try {
      const pokeOne = await getRandomPokemon();
      const pokeTwo = await getRandomPokemon();
      const moveOne = await getRandomMove(pokeOne);
      const moveTwo = await getRandomMove(pokeTwo);
      setPokemonOne(pokeOne);
      setPokemonTwo(pokeTwo);
      setPokemonOneMove(moveOne);
      setPokemonTwoMove(moveTwo);
    } catch (error) {
      setBattleLog([
        ...battleLog,
        {
          type: "error",
          message: "Failed to fetch Pokémon. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startBattle = () => {
    if (pokemonOne && pokemonTwo && pokemonOneMove && pokemonTwoMove) {
      const winner =
        pokemonOneMove.power > pokemonTwoMove.power ? pokemonOne : pokemonTwo;
      const loser = winner === pokemonOne ? pokemonTwo : pokemonOne;
      const logMessage = `Battle ${battleCount + 1}: ${
        winner.name
      } lands a decisive blow with ${winner.moves[0].move.name} knocking out ${
        loser.name
      }!`;
      setBattleLog([...battleLog, { type: "info", message: logMessage }]);
      setBattleCount(battleCount + 1);
    }
  };

  return (
    <Layout>
      <Header>
        <Title style={{ color: "white" }}>Pokémon Battle</Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title={pokemonOne ? pokemonOne.name : "Pokémon One"}
              style={{ textAlign: "center", minHeight: "300px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {loading ? (
                  <Spin />
                ) : pokemonOne ? (
                  <>
                    <img
                      src={pokemonOne.sprites.front_default}
                      alt={pokemonOne.name}
                      style={{ marginBottom: "20px" }}
                    />
                    <Text>Type: {pokemonOne.types[0].type.name}</Text>
                    {pokemonOneMove && (
                      <>
                        <Text>Attack: {pokemonOneMove.name}</Text>
                        <Text>Power: {pokemonOneMove.power}</Text>
                      </>
                    )}
                  </>
                ) : (
                  <p>No Pokémon selected</p>
                )}
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title={pokemonTwo ? pokemonTwo.name : "Pokémon Two"}
              style={{ textAlign: "center", minHeight: "300px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {loading ? (
                  <Spin />
                ) : pokemonTwo ? (
                  <>
                    <img
                      src={pokemonTwo.sprites.front_default}
                      alt={pokemonTwo.name}
                      style={{ marginBottom: "20px" }}
                    />
                    <Text>Type: {pokemonTwo.types[0].type.name}</Text>
                    {pokemonTwoMove && (
                      <>
                        <Text>Attack: {pokemonTwoMove.name}</Text>
                        <Text>Power: {pokemonTwoMove.power}</Text>
                      </>
                    )}
                  </>
                ) : (
                  <p>No Pokémon selected</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px 0",
          }}
        >
          <Button
            type="primary"
            onClick={fetchRandomPokemons}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Random Pokémon"}
          </Button>
          <Button
            type="danger"
            onClick={startBattle}
            disabled={!pokemonOne || !pokemonTwo}
            style={{ marginLeft: "10px" }}
          >
            Start Battle
          </Button>
        </div>
        <List
          header={<div>Battle Log</div>}
          bordered
          dataSource={battleLog}
          renderItem={(item, index) => (
            <List.Item key={index}>
              {item.type === "error" ? (
                <Alert message={item.message} type="error" />
              ) : (
                <Typography.Text>{item.message}</Typography.Text>
              )}
            </List.Item>
          )}
          style={{ marginTop: "20px" }}
        />
      </Content>
    </Layout>
  );
};

export default App;
