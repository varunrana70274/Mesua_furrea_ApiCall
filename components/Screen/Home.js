/* eslint-disable prettier/prettier */
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'native-base';
import Banner from '../Pages/Banner';
import Categorey from '../Pages/Categorey';
import BannerTop from '../Pages/BannerTop';
import Arrivels from '../Pages/Arrivels';
import AllArrivels from '../Pages/AllArrivels';
import { ProductRelatedService } from '../../services/ProductRelatedService';

export default function Home() {
    const [imageList, setImageList] = useState([]);
    const fetchImages = async () => {
        ProductRelatedService.allCatProduct()
            .then(res => {
                if (res.data.status === true) {
                    const response = res.data;
                    const data = response.object;
                    setImageList(data);
                }
            })
            .catch(error => {
                console.log(error);
                ToastAndroid.error(error.response?.data?.message);
            });
    };

    useEffect(() => {
        if (imageList.length == 0)
            fetchImages();
    }, []);
    return (
        <ScrollView>
            <BannerTop />
            <Categorey />
            <Arrivels />
            <View>
                {imageList?.map(mainItem => {
                    return <AllArrivels mainItem={mainItem} />;
                })}
            </View>
            <Banner />
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
