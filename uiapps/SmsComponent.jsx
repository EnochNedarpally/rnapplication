import { Alert, Button, FlatList, Modal, Platform, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SendSMS from 'react-native-sms'
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import ContactItem from '../resuableUI/contactItem';

const SmsComponent = () => {
    const [reciepients, setReciepients] = useState([]);
    const [reciepientArray, setReciepientArray] = useState([1]);
    const [selectedInputId, setSelectedInputId] = useState(0);
    const [message, setMessage] = useState("");
    const [contacts, setContacts] = useState([]);
    // const [selectedContacts, setSelectedContacts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    // const [isValidate, setIsValidate] = useState([]);


    // useEffect(() => {
    //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //         title: 'Contacts',
    //         message: 'This app would like to view your contacts.',
    //         buttonPositive: 'Please accept bare mortal',
    //     })
    //         .then((res) => {
    //             console.log('Permission: ', res);
    //             Contacts.getAll()
    //                 .then((contacts) => {
    //                     // work with contacts
    //                     console.log(contacts);
    //                 })
    //                 .catch((e) => {
    //                     console.log(e);
    //                 });
    //         })
    //         .catch((error) => {
    //             console.error('Permission error: ', error);
    //         });
    // }, [])

    const formatContactData=(contacts)=>{
        let titles=[]
        contacts.map(contact=>{
                if(!titles.includes(contact.displayName[0].toUpperCase())){
                    titles.push(contact.displayName[0].toUpperCase())
                }
                return {titles}

        })
        const formattedContacts = titles.sort().map(title=>{
            let contactArray=[]
            contacts.map(contact=>{
                // console.log(`title is ${title}  and display[0] is ${contact.displayName[0].toUpperCase()}`)
                if(title == contact.displayName[0].toUpperCase()){
                    let contactObj = {
                        displayName:contact.displayName,
                        phoneNumber:removeNonNumberCharacter(contact?.phoneNumbers[0]?.number),
                        hasThumbnail:contact?.hasThumbnail,
                        thumbnailPath:contact?.thumbnailPath
                    }
                    contactArray.push(contactObj)
                }   
            })
            const obj ={title:title,data:contactArray}
            // console.log("contactArray--->",contactArray)
            return obj
        })
        // const formatted 
        setContacts(formattedContacts)
        // console.log("titles--->",JSON.stringify(formattedContacts))
    }

    const removeNonNumberCharacter=(phoneNumber)=> {
        // Use a regular expression to match digits
        const digitPattern = /\d/g;
      
        // Use the match method to find all matches
        const digits = phoneNumber.match(digitPattern);
      
        // Join the matched digits into a single string
        return digits ? digits.join('') : '';
      }
    
    const getContacts=(id)=>{
        setSelectedInputId(id)
        setOpenModal(true)
        console.log("Getting contacts");
        if(Platform.OS=='android'){
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
                buttonPositive: 'Please accept bare mortal',
            })
                .then((res) => {
                    console.log('Permission: ', res);
                    Contacts.getAll()
                        .then((contacts) => {
                            // work with contacts
                            // console.log("getContats--->",JSON.stringify(contacts));
                            formatContactData(contacts)
                        //    setContacts(contacts);
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch((error) => {
                    console.error('Permission error: ', error);
                });
        }
    }
    const handleReceipentsChange=(i,text)=>{
        const recipientList = [...reciepients]
        recipientList[i]=text
        // let validate=/^\d{10}$/.test(text)
        // console.log("validate",validate)
        // // if(text.length)
        // let validateArray=[...isValidate]
        // validateArray[i] = validate
        // console.log("validateArray",validateArray)
        // setReciepients(recipientList);
    }
    const addRecipient=()=>{
        const recArray=[...reciepientArray]
        recArray.push(1)
        console.log("Adding input",recArray)
        setReciepientArray(recArray)
    }
    const sendMessage=()=>{
        console.log("Sending...")
        if(reciepients.length < 6 ){
            SendSMS.send({
                body: message,
                recipients: reciepients,
                successTypes: ['sent', 'queued'],
                // allowAndroidSendWithoutReadPermission: true
            }, (completed, cancelled, error) => {
        
                if (completed) {
                    Alert.alert('SMS sent completed');
                  } else if (cancelled) {
                    Alert.alert('SMS sent cancelled');
                  } else if (error) {
                    Alert.alert('Some Error Occurred');
                  }
        
            });
        }
        else Alert.alert("Recipients should not be more than 5")
        
    }

    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx.toString();
      };
    const renderItem = ({item}) => (
         <ContactItem contact={item}  reciepients={reciepients} setReciepients={(v)=>setReciepients(v)} idx={selectedInputId} />
    )
    //   console.log("contacts",JSON.stringify(contacts))
  return (
    <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        
        >
            <View style={{flex:1,backgroundColor:"white"}}>
                    <Button title='Close Modal' onPress={()=>setOpenModal(false)}/>
                    <SectionList
                    
                    sections={contacts}
   
                    renderItem={renderItem}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.header}>{title}</Text>
                      )}
                    keyExtractor={keyExtractor}
                    />
                    {reciepients.length>0 && <Button onPress={()=>setOpenModal(false)} title="Add Selected contact to recepient list" />}
            </View>

        </Modal>
        {reciepientArray.map((elem,id)=>(
            <View key={id} style={{flexDirection:'row',gap:20}}>
                <TextInput key={id} style={{flex:1}} placeholder='Enter Mobile No' value={reciepients[id]} onChangeText={text => handleReceipentsChange(id, text)} />
                {/* {!isValidate[id] && <Text>Invalid Phone Number</Text>} */}
                <TouchableOpacity style={styles.button} onPress={()=>getContacts(id)}>
                    <Text>Select from contact</Text>
                </TouchableOpacity>
            </View>
        ))}
      <Button title='+' onPress={addRecipient}/>
      
      <TextInput placeholder='Enter Message' value={message} onChangeText={text=>setMessage(text)} />
      <Button title='Send' onPress={sendMessage}/>
    </View>
  )
}

export default SmsComponent

const styles = StyleSheet.create({
    button:{
        width:100,
        margin:'auto',
        backgroundColor:'violet',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    header:{
        fontWeight:'bold',
        padding:4,
        marginVertical:10,
        fontSize:22
    }
})