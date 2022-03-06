import React, { useState } from 'react';
import { Block, IconSvg, Text, Touchable } from '~/components';
import dayjs from 'dayjs';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import { HistoryItemType } from '~/modules/history/model';
import { formatTimeUnix } from '~/utils';
import { MAP_SIGN_STATUS } from '~/common';

function HistoryItem({ historyItem }: { historyItem: HistoryItemType }) {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => setExpand(prev => !prev);
  return (
    <Block mh={20}>
      <Touchable
        mt={12}
        p={16}
        pb={8}
        bg={ColorsDefault.bgPrimary}
        borderBLRadius={20}
        borderBRRadius={20}
        borderTRRadius={20}
        activeOpacity={1}
        shadow
        onPress={toggleExpand}>
        <Block row>
          <Block mt={2} flex={1}>
            <Block row>
              <Text type='h5' color={ColorsDefault.textWhite}>
                {historyItem?.pairs}
              </Text>
              <IconSvg xml={SvgDefault.trendingUp} mh={10} />
            </Block>
            {!expand && (
              <Text mt={10} type='c1' color={ColorsDefault.textGrayDark}>
                {historyItem?.openPrice}
              </Text>
            )}
          </Block>

          <Block flex={1} center middle>
            <Text textCenter fontWeight='medium'>
              {formatTimeUnix({
                date: historyItem.closeTime,
                format: 'HH:mm',
              })}
            </Text>

            {!expand && (
              <Text mt={12} type='c1' color={ColorsDefault.textGreen}>
                {historyItem.signalStatus === 'Hit_tp_1' && (
                  <>
                    <Text ml={3} type='c1' color={ColorsDefault.textGrayDark}>
                      TP1{' '}
                    </Text>
                    {historyItem?.tp1 || 0}
                  </>
                )}

                {historyItem.signalStatus === 'Hit_tp_2' && (
                  <>
                    <Text ml={3} type='c1' color={ColorsDefault.textGrayDark}>
                      TP2{' '}
                    </Text>
                    {historyItem?.tp2 || 0}
                  </>
                )}

                {historyItem.signalStatus === 'Hit_tp_3' && (
                  <>
                    <Text ml={3} type='c1' color={ColorsDefault.textGrayDark}>
                      TP3{' '}
                    </Text>
                    {historyItem?.tp3 || 0}
                  </>
                )}
              </Text>
            )}
          </Block>

          <Block flex={1} alignItemsEnd middle>
            <Text
              mt={3}
              color={
                historyItem?.pips?.slice(0, 1) === '+'
                  ? ColorsDefault.textGreen
                  : ColorsDefault.textRed
              }>
              {historyItem?.pips}
            </Text>
            {!expand && (
              <Text mt={12} type='c1' color={ColorsDefault.textOrange}>
                <Text type='c1' color={ColorsDefault.textGrayDark}>
                  SL{' '}
                </Text>
                {historyItem?.stopLoss}
              </Text>
            )}
          </Block>
        </Block>
        {expand && (
          <Block mt={16}>
            {historyItem?.closeTime && (
              <Block pv={8} row justifyBetween borderBottom>
                <Text type='c1'>Close Time</Text>
                <Text type='c1'>
                  {dayjs.unix(historyItem?.closeTime).format('HH:mm DD-MM-YYYY')}
                </Text>
              </Block>
            )}

            {historyItem?.sentOn && (
              <Block pv={8} row justifyBetween borderBottom>
                <Text type='c1'>Sent on</Text>
                <Text type='c1'>{dayjs.unix(historyItem?.sentOn).format('HH:mm DD-MM-YYYY')}</Text>
              </Block>
            )}

            <Block pv={8} row justifyBetween borderBottom>
              <Text type='c1'>Open Price</Text>
              <Text type='c1'>{historyItem?.openPrice}</Text>
            </Block>

            <Block pv={8} row justifyBetween borderBottom>
              <Text type='c1'>Take Profit 1</Text>
              <Block row>
                {historyItem.signalStatus === 'Hit_tp_1' && (
                  <IconSvg xml={SvgDefault.success} mr={10} iconWidth={18} iconHeight={18} />
                )}
                <Text type='c1' color={ColorsDefault.textGreen}>
                  {historyItem?.tp1 || 0}
                </Text>
              </Block>
            </Block>

            <Block pv={8} row justifyBetween borderBottom>
              <Text type='c1'>Take Profit 2</Text>

              <Block row>
                {historyItem.signalStatus === 'Hit_tp_2' && (
                  <IconSvg xml={SvgDefault.success} mr={10} iconWidth={18} iconHeight={18} />
                )}
                <Text type='c1' color={ColorsDefault.textGreen}>
                  {historyItem?.tp2 || 0}
                </Text>
              </Block>
            </Block>

            <Block pv={8} row justifyBetween borderBottom>
              <Text type='c1'>Take Profit 3</Text>

              <Block row>
                {historyItem.signalStatus === 'Hit_tp_3' && (
                  <IconSvg xml={SvgDefault.success} mr={10} iconWidth={18} iconHeight={18} />
                )}

                <Text type='c1' color={ColorsDefault.textGreen}>
                  {historyItem?.tp3 || 0}
                </Text>
              </Block>
            </Block>

            <Block pv={8} row justifyBetween borderBottom>
              <Text type='c1'>Stop Loss</Text>
              <Block row>
                {historyItem.signalStatus === 'Sl_Hit' && (
                  <IconSvg xml={SvgDefault.faild} mr={10} iconWidth={18} iconHeight={18} />
                )}
                <Text type='c1' color={ColorsDefault.textGreen}>
                  {historyItem?.stopLoss}
                </Text>
              </Block>
            </Block>

            <Block pv={8} row justifyBetween>
              <Text type='c1'>Signal Status</Text>
              <Text
                type='c1'
                color={
                  historyItem?.signalStatus === 'Closed'
                    ? ColorsDefault.textRed
                    : ColorsDefault.textGreen
                }>
                {MAP_SIGN_STATUS[historyItem?.signalStatus]}
              </Text>
            </Block>
          </Block>
        )}
      </Touchable>
    </Block>
  );
}

export default HistoryItem;
