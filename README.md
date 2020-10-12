# My Dear Shaders
GLSL fragment shaders\
The beauty of mathematics

## Usage & VSCode SetUp
You can install evrything from VSCode package manager

* Install [Shader languages support for VS Code](https://github.com/stef-levesque/vscode-shader)

#### Using [Canvas](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
* Install [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
* Open the `.frag` file code, press `F1` and type `Show glslCanvas`

Canvas is convenient for live coding and playing around, but a little weird with the window UV coordinate system.

#### Using [glsl Viewver](https://github.com/patriciogonzalezvivo/glslViewer) (MacOS and Linux only)
* `brew install glslviewer` or `sudo apt instal glslviewer` for Linux
* `$> glslviewer <filename>.frag` or \
`$> glslViewer -w <width resolution> -h <high resolution> <filename>.frag`

## Shaders

Ray Marching Sphere |  Mandelbrot Flower | Mandelbrot Set |           
:-------------------------:|:-------------------------:|:-------------------------:|
![](./media/RayMarching.gif)  |  ![](./media/MandelbrotFlower.gif)  | ![](./media/MandelbrotZoom.gif)  |

Flow |  Julia Set | Circs |           
:-------------------------:|:-------------------------:|:-------------------------:|
![](./media/Flow2.gif)  |  ![](./media/JuliaSet.gif)  | ![](./media/Circs.gif)  |

Mandelbrot Lens |  Japan | Flow-2 |           
:-------------------------:|:-------------------------:|:-------------------------:|
![](./media/MandelbrotLens.gif)  |  ![](./media/Japan.gif)  | ![](./media/Flow.gif)  |

A neat wallpaper\
![Mandelbrot Flower Wallpaper](./media/MadelbrotFlowersWallpaper_blured.png)
