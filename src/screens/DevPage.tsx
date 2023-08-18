import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useColors } from "../utils";
import { ModalLayout } from "../layouts";
import { useClipboard } from "@react-native-community/clipboard";

const Code: React.FC<React.PropsWithChildren> = (children) => {
  const c = children.children!.toString();
  const colors = useColors();
  const [_clipboard, setClipboard] = useClipboard();

  const styles = StyleSheet.create({
    code: {
      color: colors("textSecondary"),
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        setClipboard(c);
      }}
    >
      <Text style={styles.code}>{c}</Text>
    </TouchableOpacity>
  );
};

const DevPage: React.FC = () => {
  const { user } = useAuth0();
  const colors = useColors();

  const styles = StyleSheet.create({
    textList: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    empty: {
      flexDirection: "row",
      gap: 20,
    },
    text: {
      color: colors("textPrimary"),
    },
  });

  return (
    <ModalLayout title={"Dev Page"} onPressMore={() => {}}>
      <View style={styles.textList}>
        <View style={styles.empty}>
          <Text style={styles.text}>
            JWT Token:
          </Text>
          <Code>Test</Code>
        </View>
      </View>
    </ModalLayout>
  );
};

export default DevPage;
