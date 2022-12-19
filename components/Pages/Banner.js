/* eslint-disable prettier/prettier */
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebsiteService } from '../../services/WebsiteService';
import { Common } from '../../helpers/common';
import { FlatList, Image } from 'native-base';
export default function Banner() {
    const [imageList, setImageList] = useState([]);
    const [imageData, setImageData] = useState([]);

    const fetchImages = async () => {

        WebsiteService.homeSectionD().then(res => {
            if (res.data.status === true) {
                const response = res.data;
                const data = response.object;
                setImageList(data);
                if (data) {
                    setImageData([`${Common.fileUrl()}${data[0]?.imageB}`]);
                }
            }
        }).catch(error => {
            console.log(error);
            ToastAndroid.error(error.response?.data?.message);
        });
    };
    useEffect(() => {
        fetchImages();
    }, []);
    return (
        <View>
            <FlatList
                data={imageData}
                horizontal={true}
                pagingEnabled={true}
                timer={3000}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View py={5} bg='white'>
                            <Image
                                height={200}
                                width={393}
                                source={{ uri: item }} />
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
