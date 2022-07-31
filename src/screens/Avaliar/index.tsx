import WebView from "react-native-webview";
import { TIP } from "../../services/data";
import { Space } from "../../components/Space";

export function Avaliar() {
  return (
    <Space>
      <WebView
        source={{ uri: `https://safe-woman.vercel.app/avaliar/${TIP[0].id}` }}
      />
    </Space>
  );
}
