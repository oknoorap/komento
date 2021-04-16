import { ChangeEvent } from "react";
import {
  SimpleGrid,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Heading,
  Select,
} from "@chakra-ui/react";
import ColorPicker from "rc-color-picker";
import "rc-color-picker/assets/index.css";

import { useSetup } from "hooks/use-setup";
import highlighterThemes from "components/markdown-preview/renderers/code-themes";

const SetupConfigView = () => {
  const {
    bgColor,
    setBgColor,
    borderColor,
    setBorderColor,
    textColor,
    setTextColor,
    buttonColor,
    setButtonColor,
    linkColor,
    setLinkColor,
    codeHighlighter,
    setCodeHighlighter,
    withQS,
    setWithQS,
    withHash,
    setWithHash,
  } = useSetup();

  const forms = [
    {
      label: "Background Color",
      value: bgColor,
      type: "color",
      onChange: (colors) => setBgColor(colors.color),
    },

    {
      label: "Border Color",
      value: borderColor,
      type: "color",
      onChange: (colors) => setBorderColor(colors.color),
    },

    {
      label: "Text Color",
      value: textColor,
      type: "color",
      onChange: (colors) => setTextColor(colors.color),
    },

    {
      label: "Button Color",
      value: buttonColor,
      type: "color",
      onChange: (colors) => setButtonColor(colors.color),
    },

    {
      label: "Link Color",
      value: linkColor,
      type: "color",
      onChange: (colors) => setLinkColor(colors.color),
    },

    {
      label: "Codes Highlighter",
      value: codeHighlighter,
      options: highlighterThemes,
      type: "select",
      onChange(event: ChangeEvent<HTMLSelectElement>) {
        setCodeHighlighter(event.target.value);
      },
    },

    {
      label: "Include Query String",
      value: withQS,
      type: "switch",
      onChange() {
        setWithQS((withQS) => !withQS);
      },
    },

    {
      label: "Include URL Hash",
      value: withHash,
      type: "switch",
      onChange() {
        setWithHash((withHash) => !withHash);
      },
    },
  ];

  return (
    <Box w="60%" mx="auto">
      <Heading
        as="h2"
        mb="10"
        fontSize="3xl"
        textAlign="center"
        color="gray.600"
      >
        Setup and Embed Comment
      </Heading>
      <SimpleGrid columns={3} columnGap="2">
        {forms.map(({ label, value, type, options, onChange }, index) => {
          switch (type) {
            case "color":
              return (
                <FormControl key={`form-${index}`} mb="4">
                  <FormLabel>{label}</FormLabel>
                  <Flex alignItems="center">
                    <Box as="span" lineHeight="0">
                      <ColorPicker
                        color={value as string}
                        onChange={onChange}
                        placement="bottomLeft"
                      />
                    </Box>
                    <Box ml="2" fontSize="sm">
                      {value}
                    </Box>
                  </Flex>
                </FormControl>
              );

            case "select":
              return (
                <FormControl key={`form-${index}`} mb="4">
                  <FormLabel htmlFor={`form-${index}`}>{label}</FormLabel>
                  <Select
                    size="xs"
                    variant="flushed"
                    defaultValue={value as string}
                    onChange={onChange}
                  >
                    {options.map((optionValue, optionIndex) => (
                      <option
                        key={`form-select-${index}-${optionIndex}`}
                        value={optionValue}
                      >
                        {optionValue}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              );

            case "switch":
              return (
                <FormControl key={`form-${index}`} mb="4">
                  <FormLabel htmlFor={`form-${index}`}>{label}</FormLabel>
                  <Switch
                    id={`form-${index}`}
                    colorScheme="cerulean"
                    isChecked={value as boolean}
                    onChange={onChange as () => void}
                  />
                </FormControl>
              );

            default:
              return <Box key={`form-${index}`} />;
          }
        })}
      </SimpleGrid>
    </Box>
  );
};

export default SetupConfigView;
