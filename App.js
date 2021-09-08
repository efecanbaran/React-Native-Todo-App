import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform, StatusBar, FlatList, TextInput, TouchableOpacity, Button } from "react-native";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [text, setText] = useState();
  const [todos, setTodos] = useState([])

  const deleteItem = (a) => {
    setTodos(todos.filter(item => item.id !== a.id))
  }

  const addTodo = () => {
    if (text !== "") {
      const newList = [...todos, { id: uuidv4(), todo: text, completed: false}]
      setTodos(newList)
      setText("")
    }
  }

  const completedItem = (data) => {
    setTodos(todos.map(item => {
      if(item.id === data.id){
        item.completed = !item.completed
      }
      return item
    }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <FlatList
          style={styles.center}
          data={todos}
          renderItem={({ item }) => (

            <TouchableOpacity style={styles.item} key={item.id} onPress={() => completedItem(item)}>
              <View style={{
                justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: '100%', width: '90%',
                backgroundColor: item.completed === false ? '#113f67' : "#ccc"
                , borderRadius: 10, paddingHorizontal: 20, paddingVertical: 30,
              }}>
                <Text style={{
                  fontSize: 20,
                  color: '#fff', textDecorationLine: item.completed === true ? "line-through": "none",
                }}>{item.todo}</Text>
                <Text onPress={() => deleteItem(item)} style={styles.sil}>Sil</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.itemInput}>
        <TextInput value={text} onChangeText={txt => setText(txt)} style={styles.input} />
        <View style={styles.btn}>
          <Text onPress={addTodo} style={{ color: "#fff", fontSize: 40 }}>+</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7eaf6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center'
  },
  item: {
    width: "100%",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  items: {
    backgroundColor: '#fff',
    flex: 0.90,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 10,
    elevation: 3,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  text: {

  },
  sil: {
    textDecorationLine: 'underline',
    color: '#fff',
    fontSize: 20
  },
  itemInput: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: "85%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    fontSize: 25,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: '#e7eaf6'
  },
  btn: {
    backgroundColor: '#113f67',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  }
});

export default App;