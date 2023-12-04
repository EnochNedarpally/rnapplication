import { Text, View } from "react-native";

import { styles } from "./styles";
import { useState } from "react";
import SmartTextInput from "../resuableUI/smartTextInput";
import Dropdown from "../resuableUI/dropdown";

const TextInputParentComponent = () => {
    const [name, setName] = useState('');
    const [actors, setActors]=useState([
        'Manager', 'Engineer', 'Developer', 'Lead'
    ]);
    const [selValue, setSelValue]=useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                The Demo for Smart Text Input
            </Text>
            {/* Loading he Child Component inside the Parent Component 
                emitData is a props that will be accepting value from the
                SmartTextInput child component and will update 
                the 'name' state by dispatching 'setName' action 
               
            */}
            <SmartTextInput label={'Enter Name'} text={'MAhesh'}
              emitData={(v)=>setName(v)}
            />
            <Text style={styles.text}>
               Value Received from Child: {name}
            </Text>

            <View style={{flex:2, backgroundColor:'yellow'}}>
                <Dropdown title={'Select Actor'} collection={actors}
                selectedOption={(v)=>setSelValue(v)}
                />
            </View>
            <Text style={styles.text}>
                Selected Actor: {selValue}
            </Text>
        </View>
    );

};

export default TextInputParentComponent;