# 一个ip地址合并的样例
## 具体使用参考源码
```py
#!/usr/bin/python3
# -*- coding:utf-8 -*-
import IPy
import ipaddress
import logging
import traceback

logger = logging.getLogger()
trace_logger = logging.getLogger()

def merge_range_net(nets: list):
    out_nets = list()
    length = len(nets)
    if length == 0:
        return out_nets
    i = 0
    while i < length:
        re_loop = False
        net = nets[i]
        if net is None:
            i += 1
            continue
        for ii in range(i+1, length):
            net1 = nets[ii]
            if net1 is None:
                continue

            # 刚好拼接merge
            if net[1] == net1[0]-1:
                nets[ii] = None
                nets[i] =  [net[0], net1[1]]
                re_loop = True
                break
            if net[0] - 1 == net1[1]:
                nets[ii] = None
                nets[i] = [net1[0], net[1]]
                re_loop = True
                break

            # 不能拼接
            if net[1] < net1[0]:
                continue
            if net[0] > net1[1]:
                continue

            # 重叠merge
            nets[ii] = None
            nets[i] = [min(net[0], net1[0]), max(net[1], net1[1])]
            re_loop = True
            break
        if re_loop:
            i = 0
        else:
            i += 1
    for net in nets:
        if net:
            first_ip = ipaddress.IPv4Address(net[0])
            last_ip = ipaddress.IPv4Address(net[1])
            out_nets.extend(ipaddress.summarize_address_range(first_ip, last_ip))
            
    return out_nets

def transfer2range(ip_desc : str):
    if "range" in ip_desc:
        res = ip_desc.split()
        try:
            res[1] = IPy.IP(res[1]).int()
            res[2] = IPy.IP(res[2]).int()
            return res[1:]
        except Exception as e:
            logger.error(f"{e}")
            trace_logger.error(traceback.format_exc())
            return
        finally:
            ""
    net = None
    res = None
    try:
        if '/' in ip_desc:
            net = ipaddress.IPv4Network(ip_desc.split("/")[0])
        net = ipaddress.IPv4Network(ip_desc)
    except Exception as e:
        logger.error(f"{e}")
        trace_logger.error(traceback.format_exc())
        if not net:
            return
    finally:
        ""
    try:
        return [IPy.IP(str(net.network_address)).int(), IPy.IP(str(net.broadcast_address)).int() ]
    except Exception as e:
        logger.error(f"{e}")
        trace_logger.error(traceback.format_exc())
        return
    finally:
        ""


def merge_ips(ip_desc: list):
    nets = list()
    for s in ip_desc:
        net = transfer2range(s)
        if net:
            nets.append(net)
    nets = merge_range_net(nets)
    return nets
    
if __name__ == "__main__":
    try:
        ipdescs= ['1.1.1.1', '1.1.1.0', "range 1.1.1.1 1.1.1.4", '1.1.1.16/28', '1.1.1.20/31', '1.1.1.0/255.255.255.0']
        print(merge_ips(ipdescs))
    except Exception as e:
        print(traceback.format_exc())
```