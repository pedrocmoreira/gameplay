import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from 'react-native';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
}

export function Button({ title, ...rest } : Props ){
    return (
        <TouchableOpacity style={styles.container} {...rest} activeOpacity={.7}>
 
            <Text  style={styles.title} >
                {title}
            </Text>
        </TouchableOpacity>
    );
}