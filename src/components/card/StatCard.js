// Composant Card pour KPI Statistics
import React from 'react';
import {
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';

export default function StatCard({
  startContent,
  endContent,
  name,
  growth,
  value,
  icon,
  subtitle,
}) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');

  return (
    <Card py="15px">
      <Flex
        my="auto"
        h="100%"
        align="center"
        justify="space-between"
      >
        {startContent}

        <Flex direction="column" py="5px" me="auto">
          <Text
            fontSize="sm"
            color={textColorSecondary}
            fontWeight="500"
            mb="4px"
          >
            {name}
          </Text>
          <Text
            fontSize="34px"
            color={textColor}
            fontWeight="700"
            lineHeight="100%"
          >
            {value}
          </Text>
          {subtitle && (
            <Text
              fontSize="xs"
              color={textColorSecondary}
              fontWeight="500"
              mt="4px"
            >
              {subtitle}
            </Text>
          )}
          {growth && (
            <Box mt="5px">
              <Text
                as="span"
                color={growth.startsWith('+') ? 'green.500' : 'red.500'}
                fontSize="sm"
                fontWeight="700"
              >
                {growth}
              </Text>
              <Text
                as="span"
                color={textColorSecondary}
                fontSize="sm"
                fontWeight="500"
                ml="5px"
              >
                vs le mois dernier
              </Text>
            </Box>
          )}
        </Flex>

        {icon && (
          <IconBox
            w="56px"
            h="56px"
            bg={boxBg}
            icon={<Icon w="28px" h="28px" as={icon} color={brandColor} />}
          />
        )}

        {endContent}
      </Flex>
    </Card>
  );
}
