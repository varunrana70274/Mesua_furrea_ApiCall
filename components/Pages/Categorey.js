/* eslint-disable prettier/prettier */
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Box } from 'native-base';
import { Common } from '../../helpers/common';
import { ProductRelatedService } from '../../services/ProductRelatedService';
export default function Categorey() {
    const [imageList, setImageList] = useState([]);
    const fetchImages = async () => {
        ProductRelatedService.allCategory()
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
        if (imageList.length === 0) {
            fetchImages();
        }
    }, []);
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 2 }}>
            <View flexDirection="row">
                {imageList?.map(category => {
                    return (
                        <Pressable >
                            <Box
                                flexDirection="column"
                                alignItems="center"
                                my={2}
                                p="2"
                                rounded="xl"
                                bg="white"
                                mx={1}
                                key={category.descr}
                            >
                                <Image
                                    mx={2}
                                    borderRadius={100}
                                    alt={category.descr}
                                    source={{
                                        uri: `${Common.fileUrl()}${category.fileUrl}`,
                                    }}
                                    // size={60}
                                    width={60}
                                    height={60}
                                />
                                <Text>{category.descr}</Text>
                            </Box>
                        </Pressable>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
