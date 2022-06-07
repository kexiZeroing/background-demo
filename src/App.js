import React, { useState, useEffect } from "react";
import FilterItem from "./components/FilterItem";
import FiltersGroup from "./components/FiltersGroup";
import Webcam from "./components/Webcam";
import {
	BlurFilter,
	ColorFilter,
	CustomBackgroundImageFilter,
} from "./utils/filters";
import Upload from "rc-upload";

function App() {
  const [permission, setPermission] = useState();
  const [filter, setFilter] = useState();
	const resolution = { width: 1280, height: 720 };

  // only used for check the permission for webcam
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: resolution.width,
        height: resolution.height,
        facingMode: "user",
      },
    }).then(() => setPermission(true))
      .catch(() => setPermission(false))
  }, [])

  return (
    <div className="container">
      <section className="video-container">
        { permission ? <Webcam filter={filter} resolution={resolution} /> : <div>打开摄像头...</div> }
      </section>
      <section className="option-container">
        <FiltersGroup title="背景虚化">
          <FilterItem
            tooltip="no blur"
            backgroundColor="#fff"
            onClick={() => setFilter(null)}
          />
          <FilterItem
            tooltip="blur(6)"
            backgroundColor="#999"
            onClick={() => setFilter(new BlurFilter(6))}
          />
          <FilterItem
            tooltip="blur(18)"
            backgroundColor="#eee"
            onClick={() => setFilter(new BlurFilter(18))}
          />
				</FiltersGroup>

        <FiltersGroup title="背景颜色">
          <FilterItem
            tooltip="Blue"
            backgroundColor="#0000ff"
            onClick={() => setFilter(new ColorFilter("#0000ff"))}
          />
          <FilterItem
						tooltip="White"
						backgroundColor="#ffffff"
						onClick={() => setFilter(new ColorFilter("#ffffff"))}
					/>
					<FilterItem
						tooltip="Black"
						backgroundColor="#000000"
						onClick={() => setFilter(new ColorFilter("#000000"))}
					/>
        </FiltersGroup>

        <FiltersGroup title="背景图片">
					<Upload
						accept="image/*"
						beforeUpload={(file) => {
							setFilter(new CustomBackgroundImageFilter(file));
							return file;
						}}
					>
						<FilterItem tooltip="image" />
					</Upload>
				</FiltersGroup>

      </section>
    </div>
  );
}

export default App;
