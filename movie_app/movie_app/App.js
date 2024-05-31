import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
const App = () => {
const [movieTitle, setMovieTitle] = useState('');
const [movieData, setMovieData] = useState(null);
const handleSearch = async () => {
if (movieTitle.trim() === '') {
Alert.alert('Aviso', 'Por favor, insira um título de filme válido.');
return;
}
try {
const apiKey = 'e25ba91a'; // Substitua pelo seu próprio API Key
const apiUrl = 'https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}';
const response = await fetch(apiUrl);
const data = await response.json();
console.log(data)
if (data.Response === 'True') {
setMovieData(data);
} else {
Alert.alert('Erro', 'Filme não encontrado. Verifique o título e tente novamente.');
}
} catch (error) {
console.error(error);
Alert.alert('Erro', 'Houve um problema na busca do filme. Tente novamente mais tarde.');
}
};
return (
<View>
<Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>
Busca de Filmes
</Text>
<TextInput
style={{ borderWidth: 1, margin: 10, padding: 8 }}
placeholder="Digite o nome do filme"
value={movieTitle}
onChangeText={(text) => setMovieTitle(text)}
/>
<Button title="Buscar Filme" onPress={handleSearch} />
{movieData && (
<View style={{ margin: 20 }}>
<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{movieData.Title}</Text>
<Text>Ano: {movieData.Year}</Text>
<Text>Gênero: {movieData.Genre}</Text>
<Text>Diretor: {movieData.Director}</Text>
<Text>Prêmios: {movieData.Awards}</Text>
</View>
)}
</View>
);
};
export default App;