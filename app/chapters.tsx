import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { tintColorDark, tintColorLight } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { Pressable, TouchableOpacity } from "react-native";

export default function Chapters() {
  const backgroundColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "text"
  );
  const { chapters, book, version, list , ilist} = useLocalSearchParams();
  const router = useRouter();
  const chapterslist = list.split(",");
  return (
    <>
      <ThemedView
        style={{
          paddingTop: 50,
          paddingLeft: 30,
          paddingBottom: 10,
          borderBottomWidth:1,
          borderBottomColor: backgroundColor,
          paddingRight: 100,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            paddingBottom: 6,
            paddingRight: 10,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: backgroundColor,
          }}
          onPress={() => {
            router.navigate({
              pathname: "/",
            });
          }}
        >
          
          <TabBarIcon color='#4d2600' name="arrow-back" />
        </TouchableOpacity>

        <ThemedText
          type="title"
          style={{ paddingLeft: 6, alignSelf: "center" }}
        >
          {book} {chapters}
        </ThemedText>
      </ThemedView>
      <ParallaxScrollView
        headerBackgroundColor={{ light: tintColorLight, dark: tintColorDark }}
      >
        {chapterslist.map((item: number | any ) => {
          
          return (
            <TouchableOpacity
              key={item}
              style={{
                width: "18%",
                display:'flex',
               
                justifyContent: 'center',
                
                borderWidth: 1,
                height: 50,
                borderColor: backgroundColor,
                borderRadius: 6,
              }}
              onPress={() => {
                router.navigate({
                  pathname: "/verses",
                  params: { chapter: item, from: version , book:book, chapters:chapters, ilist : ilist },
                });
              }}
            >
             
                <ThemedText style={{ borderRadius: 6, width:'99%', textAlign:'center' }}type="subtitle">{item}</ThemedText>
           
            </TouchableOpacity>
          );
        })}
      </ParallaxScrollView>
    </>
  );
}
