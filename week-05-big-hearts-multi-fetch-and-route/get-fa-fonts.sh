
mkdir ./css/fonts

FONTS_ARRAY=(eot svg ttf woff woff2)

for font_ext in "${FONTS_ARRAY[@]}"
do
   echo downloading $font_ext
   curl https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/fonts/fontawesome-webfont.${font_ext}?raw=true > ./css/fonts/fontawesome-webfont.${font_ext}
done