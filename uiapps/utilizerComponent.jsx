import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ButtonList from './buttonList'
import { styles } from './styles'
const UtilizerComponent = () => {
    const [character, setCharacter] = useState("")
    const [actor, setActor] = useState("")
const characters = ["Indiana Jones", "Jack Reacher", "Ethan Hunt","James Bond","Jason Bourn"]
const actors = ["Tom Cruise", "Daniel Craig", "Tom Hanks","Andrew Garfield","Morgan Freeman"]
  return (
      <View style={{ flex: 1 }}>
          <View style={{flex:2,backgroundColor:'yellow'}}>
              <Text>List Of Characters</Text>
              <ButtonList selectedValue={(v)=>setCharacter(v)} collections={characters} />
              <Text style={styles.text}>Selected character:{character}</Text>
          </View>
          <View style={{flex:3,backgroundColor:'crimson'}}>
              <Text>List Of Actors</Text>
              <ButtonList selectedValue={(v)=>setActor(v)} collections={actors} />
              <Text style={styles.text}>Selected Actor:{actor}</Text>
          </View>
      </View>
  )
}

export default UtilizerComponent

