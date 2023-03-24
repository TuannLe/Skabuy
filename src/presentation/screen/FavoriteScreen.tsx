import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import PhoneInput from 'react-native-phone-input'

export default function FavoriteScreen() {
    const [value, setValue] = useState()
    return (
        <View style={tw`w-full h-full px-3`}>
            <PhoneInput
                ref={(ref) => { this.phone = ref; }}
                onPressFlag={this.onPressFlag}
                initialCountry={'us'}
                initialValue="13178675309"
                textProps={{
                    placeholder: 'Enter a phone number...'
                }}
            />
        </View>
    )
}