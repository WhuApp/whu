import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useColors } from "../utils";
import { ModalLayout } from "../layouts";
import { useClipboard } from "@react-native-community/clipboard";
import { TextInput } from "../components";

const Code: React.FC<React.PropsWithChildren> = ({ children }) => {
  const c = children!.toString();
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

const ObjectView: React.FC<{ obj: unknown }> = ({ obj }) => {
  if (!obj) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  const s = useMemo(() => Object.entries(obj), []);
  const colors = useColors();

  const styles = StyleSheet.create({
    empty: {
      flexDirection: "row",
      gap: 20,
    },
    text: {
      color: colors("textPrimary"),
    },
  });
  return (
    <VirtualizedList
      data={s}
      initialNumToRender={s.length}
      renderItem={({ item }) => {
        const name = item[0];
        const content = item[1];
        return (
          <View style={styles.empty}>
            <Text style={styles.text}>
              {name}
            </Text>
            {!content && <Code>null</Code>}
            {(content && typeof (content) === "string") && (
              <Code>{content}</Code>
            )}
            {(content && typeof (content) === "number") && (
              <Code>{(content as number).toString()}</Code>
            )}
            {(content && typeof (content) === "object") && (
              <ObjectView obj={content} />
            )}
          </View>
        );
      }}
      keyExtractor={(item) => item[0]}
      getItemCount={(o) => o.length}
      getItem={(o, i) => o[i]}
    />
  );
};

const DevPage: React.FC = () => {
  const { getCredentials, user } = useAuth0();
  const colors = useColors();
  const [credentials, setCredentials] = useState(undefined);

  useEffect(() => {
    getCredentials().then((c) => setCredentials(c));
  }, [user]);

  const styles = StyleSheet.create({
    textList: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    title: {
      color: colors("textPrimary"),
      fontSize: 25,
    },
  });

  return (
    <ModalLayout title={"Dev Page"} onPressMore={() => {}}>
      <View style={styles.textList}>
        <View>
          <Text style={styles.title}>Credentials</Text>
          <ObjectView obj={credentials}></ObjectView>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    </ModalLayout>
  );
};

export default DevPage;
