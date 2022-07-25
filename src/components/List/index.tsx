import React, { ReactNode } from "react";
import { TouchableOpacity,Text } from "react-native";

type Props = {
    title: string;
    children: ReactNode
}

export function List({ title, children, ...rest }: Props){
    return(
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} {...rest}>
            {children}
            <Text style={{
                paddingLeft: 10
            }}>{title}</Text>
        </TouchableOpacity>
    )
}