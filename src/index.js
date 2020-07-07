import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App(){

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject(){
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Gabriel Machado'
    });
    setProjects([...projects, response.data]);
  }


  return (
  <>
  <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
  <SafeAreaView style={styles.container}>
  <FlatList 
  data={projects}
  keyExtractor={project => project.id}
  renderItem={({ item }) => (
    <Text style={styles.project}>{item.title}</Text>
  )} />
  {/*<View style={styles.container} >
  {projects.map(project => (
    <Text style={styles.project} key={project.id}>{project.title}</Text>
  ))}
  </View>*/}
  <TouchableOpacity 
  activeOpacity={0.6} 
  style={styles.button} 
  onPress={handleAddProject}
  >
    <Text style={styles.buttonText}>
      Adicionar Projeto
    </Text>
  </TouchableOpacity>
  </SafeAreaView>
  </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#7159c1',
  },
  project:{
    color: '#FFF',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: { 
    fontWeight: 'bold',
    fontSize: 16,
  }
});