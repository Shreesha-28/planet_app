import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import {ListItem,Icon,Card} from "react-native-elements";
import axios from "axios"

export default class DetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:`http://localhost:5000/planet?name=${this.props.navigation.getParam("planet_name")}`,
            details:{},
            imagepath:""
        }       
    }
    componentDidMount(){
        this.getDetails()
    }
    getDetails=()=>{
        const {url}=this.state;
        axios
        .get(url)
        .then(response=>{
            this.setDetails(response.data.data)
        })
    }
    setDetails=planetDetails=>{
        const planetType=planetDetails.planet_type;
        let imagepath=""
        switch(planetType){
            case "Gas Giant":
                imagepath=require("../assets/planet_type/gas_giant.png");
                break;
            case "Terrestrial":
                imagepath=require("../assets/planet_type/terrestrial.png");
                break;
            case "Super Earth":
                imagepath=require("../assets/planet_type/super_earth.png");
                break;
            case "Neptune Like":
                imagepath=require("../assets/planet_type/neptune_like.png");
                break;
            default:
                 imagepath=require("../assets/planet_type/gas_giant.png");
        }
        this.setState({
            details:planetDetails,
            imagepath:imagepath
        })
    }
    render(){
        const {details,imagePath} = this.state;
        if(details.specifications) {
            return(
                <View style ={{flex:1}}>
                    <Card
                        title={details.name}
                        image={imagePath}
                        imageProps = {{resizeMode:"contain",width :"100%"}}
                    >
                        <View>
                            <Text style={{marginBottom:10}}>
                                {`Distance from Earth: ${details.distance_from_earth}`}
                            </Text>

                            <Text style={{marginBottom:10}}>
                                {`Distance from Sun: ${details.distance_from_their_sun}`}
                            </Text>

                            <Text style={{marginBottom:10}}>
                                {`Orbital Period: ${details.orbital_period}`}
                            </Text>

                            <Text style={{marginBottom:10}}>
                                {`Orbital Speed : ${details.orbital_speed}`}
                            </Text>

                            <Text style={{marginBottom:10}}>
                                {`Planet Mass: ${details.planet_mass}`}
                            </Text>

                            <Text style={{marginBottom:10}}>
                                {`Planet Radius: ${details.planet_radius}`}
                            </Text>

                            <Text style={{marginBottom:10}}>
                                {`Planet type: ${details.planet_type}`}
                            </Text>
                        </View>

                        <View style={{marginBottom:10,flexDirection:"column"}}>
                            <Text>{details.specifications?`Specifications : `:""}</Text>

                            {
                                details.specifications.map((item,index)=>(
                                    <Text key={index.toString()} style={{marginLeft:50}}>{item}</Text>
                                ))
                            }
                        </View>

                    </Card>
                </View>
            )
        }
    }
}