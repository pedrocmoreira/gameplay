import React from "react";
import { TouchableOpacity } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import {
    Text,
    Image, 
    View,
} from 'react-native'

import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

type Props = {
    title: string;
    onPress: () => void;
}

export function ButtonIcon({ title, onPress, ...rest } : Props ){
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon}/>
            </View>
            <Text  style={styles.title} >
                {title}
            </Text>
        </TouchableOpacity>
    );
}