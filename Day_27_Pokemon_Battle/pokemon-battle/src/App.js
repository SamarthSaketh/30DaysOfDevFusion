import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  Text,
  Image,
  Button,
  SimpleGrid,
  Badge,
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const trainers = [
  { name: "Ash Ketchum", img: "/images/trainers/Ash_Ketchum.png" },
  { name: "Brock", img: "/images/trainers/Brock.png" },
  { name: "Cynthia", img: "/images/trainers/Cynthia.png" },
  { name: "Gary", img: "/images/trainers/Gary.png" },
  { name: "Lance", img: "/images/trainers/Lance.png" },
  { name: "Misty", img: "/images/trainers/Misty.png" },
  { name: "Red", img: "/images/trainers/Red.png" },
];

function App() {
  const [availablePokemons, setAvailablePokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [team1, setTeam1] = useState({ trainer: "", pokemons: [] });
  const [team2, setTeam2] = useState({ trainer: "", pokemons: [] });
  const [battleZone, setBattleZone] = useState([]);
  const [winner, setWinner] = useState(null);
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [pokemonTypeFilter, setPokemonTypeFilter] = useState("");
  const [pokemonSort, setPokemonSort] = useState("");

  // Fetch Pokémon list (first 151)
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setAvailablePokemons(data.results));
  }, []);

  // Fetch Pokémon data
  const fetchPokemonData = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    return {
      name: data.name,
      img: data.sprites.front_default,
      types: data.types.map((t) => t.type.name),
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
      },
      lost: false,
    };
  };

  // Filter and sort Pokémons
  useEffect(() => {
    let filtered = [...availablePokemons];
    if (pokemonTypeFilter) {
      filtered = filtered.filter(async (p) => {
        const data = await fetchPokemonData(p.name);
        return data.types.includes(pokemonTypeFilter);
      });
    }
    if (pokemonSort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredPokemons(filtered);
  }, [pokemonTypeFilter, pokemonSort, availablePokemons]);

  const handleTrainerSelect = (team, trainer) => {
    if (team === 1) setTeam1({ ...team1, trainer });
    else setTeam2({ ...team2, trainer });
  };

  const handleAddPokemon = async (team, name) => {
    const pokemon = await fetchPokemonData(name);
    if (team === 1 && team1.pokemons.length < 3) {
      setTeam1({ ...team1, pokemons: [...team1.pokemons, pokemon] });
    } else if (team === 2 && team2.pokemons.length < 3) {
      setTeam2({ ...team2, pokemons: [...team2.pokemons, pokemon] });
    }
  };

  const startBattle = () => {
    const p1Alive = team1.pokemons.filter((p) => !p.lost);
    const p2Alive = team2.pokemons.filter((p) => !p.lost);
    if (p1Alive.length === 0 || p2Alive.length === 0) {
      setWinner(p1Alive.length > 0 ? 1 : 2);
      return;
    }
    setBattleZone([p1Alive[0], p2Alive[0]]);
  };

  const fight = () => {
    if (battleZone.length === 0) return;
    setBattleInProgress(true);

    setTimeout(() => {
      const [p1, p2] = battleZone;
      const p1Power = p1.stats.attack + p1.stats.defense + p1.stats.speed;
      const p2Power = p2.stats.attack + p2.stats.defense + p2.stats.speed;

      let newTeam1 = [...team1.pokemons];
      let newTeam2 = [...team2.pokemons];

      if (p1Power > p2Power) newTeam2 = newTeam2.map((pk) => (pk.name === p2.name ? { ...pk, lost: true } : pk));
      else if (p2Power > p1Power) newTeam1 = newTeam1.map((pk) => (pk.name === p1.name ? { ...pk, lost: true } : pk));
      else {
        newTeam1 = newTeam1.map((pk) => (pk.name === p1.name ? { ...pk, lost: true } : pk));
        newTeam2 = newTeam2.map((pk) => (pk.name === p2.name ? { ...pk, lost: true } : pk));
      }

      setTeam1({ ...team1, pokemons: newTeam1 });
      setTeam2({ ...team2, pokemons: newTeam2 });
      setBattleZone([]);
      setBattleInProgress(false);

      // Check if game over
      if (newTeam1.filter((p) => !p.lost).length === 0) setWinner(2);
      else if (newTeam2.filter((p) => !p.lost).length === 0) setWinner(1);
    }, 2000);
  };

  const resetGame = () => {
    setTeam1({ trainer: "", pokemons: [] });
    setTeam2({ trainer: "", pokemons: [] });
    setBattleZone([]);
    setWinner(null);
    setBattleInProgress(false);
  };

  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="3xl" fontWeight="bold" mb={5}>
        ⚡ Pokémon Battle Simulator ⚡
      </Text>

      <SimpleGrid columns={2} spacing={10} mb={5}>
        {[team1, team2].map((team, index) => (
          <Box key={index}>
            <Text fontWeight="bold">Team {index + 1} Trainer</Text>
            <Select
              placeholder="Select Trainer"
              value={team.trainer}
              onChange={(e) => handleTrainerSelect(index + 1, e.target.value)}
            >
              {trainers.filter((t) => t.name !== (index === 0 ? team2.trainer : team1.trainer)).map((t) => (
                <option key={t.name} value={t.name}>{t.name}</option>
              ))}
            </Select>
            {team.trainer && <Image src={trainers.find((t) => t.name === team.trainer).img} boxSize="100px" m="auto" />}
            
            <Select
              placeholder="Add Pokémon"
              mt={2}
              onChange={(e) => handleAddPokemon(index + 1, e.target.value)}
            >
              {availablePokemons.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </Select>
            <HStack mt={3} justify="center">
              {team.pokemons.map((p) =>
                p ? (
                  <Box
                    key={p.name}
                    border="1px solid gray"
                    p={2}
                    opacity={p.lost ? 0.5 : 1}
                    position="relative"
                    borderRadius="md"
                    bg="gray.100"
                  >
                    {p.lost && <Badge colorScheme="red" position="absolute" top="1" left="1">LOST</Badge>}
                    <Image src={p.img} boxSize="100px" m="auto" />
                    <Text fontSize="sm" fontWeight="bold">{p.name}</Text>
                    <Text fontSize="xs">⚔️ {p.stats.attack} | 🛡️ {p.stats.defense} | 💨 {p.stats.speed}</Text>
                  </Box>
                ) : null
              )}
            </HStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Battle Zone */}
      {battleZone.length > 0 && (
        <VStack mt={5} bg="gray.200" p={4} borderRadius="md">
          <Text fontWeight="bold">Battle!</Text>
          <HStack justify="center" spacing={20}>
            {battleZone.map((p) => (
              <motion.div
                key={p.name}
                initial={{ y: -50 }}
                animate={{ y: 0, scale: [1, 1.5, 1] }}
                transition={{ duration: 1 }}
                style={{ textAlign: "center" }}
              >
                <Image src={p.img} alt={p.name} boxSize="140px" m="auto" />
                <Text fontWeight="bold" color="black">{p.name}</Text>
                <Text fontSize="sm" color="black">
                  ⚔️ {p.stats.attack} | 🛡️ {p.stats.defense} | 💨 {p.stats.speed}
                </Text>
                {p.lost && <Badge colorScheme="red" mt={1}>LOST</Badge>}
              </motion.div>
            ))}
          </HStack>
        </VStack>
      )}

      {!battleInProgress && !winner && (
        <Button mt={5} colorScheme="blue" onClick={battleZone.length > 0 ? fight : startBattle}>
          {battleZone.length > 0 ? "Resolve Battle" : "Start Battle"}
        </Button>
      )}

      {winner && (
        <VStack mt={5}>
          <Confetti />
          <Text fontSize="2xl" mt={3}>Team {winner} Wins! 🎉</Text>
          <Button mt={3} colorScheme="green" onClick={resetGame}>
            New Game
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
