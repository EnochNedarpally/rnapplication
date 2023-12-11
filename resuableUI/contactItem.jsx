import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Touchable, TouchableOpacity} from 'react-native';
const ContactItem = ({contact,reciepients,setReciepients,idx}) => {
  const [isSelect, setIsSelect] = useState(false)
    const selectNumber=(number)=>{
      setIsSelect(!isSelect)
        const contactList=[...reciepients]
        contactList[idx]=number
        setReciepients(contactList)
      }
  return (
    <TouchableOpacity onPress={()=>{selectNumber(contact.phoneNumber)}}  style={isSelect ?styles.contactConSeleted :styles.contactCon} >
      <View style={styles.imgCon}>
        {contact.hasThumbnail? (
        <Image style={{width:55,height:55,borderRadius:30,objectFit:'contain'}} source={{uri:contact.thumbnailPath}} />):
         (<View style={styles.placeholder}>
          <Text style={styles.txt}>{contact?.displayName[0]}</Text>
        </View>)}
      </View>
      <View style={styles.contactDat}>
        <Text style={styles.name}>
          {contact?.displayName}
        </Text>
        <Text style={styles.phoneNumber}>
          {contact?.phoneNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  contactConSeleted:{
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    backgroundColor:'#89c8b8'
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
});
export default ContactItem;