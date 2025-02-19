# tkinter开发界面客户端工具

## 前言
这是一个使用python3开发的windows环境下，读取串口数据的桌面小工具。

## 要求
- 跨系统（windowsXP、Windows7及以上系统均可运行）
- 短时间
- 读取串口
- 界面能展示，且支持另存Excel
- 国际化（界面支持中文、英文）

## 结论
python3有现成的第三方库，灵活方便，以上功能要求都能满足。
最后使用pyinstaller发布。
同时具备完备的日志记录和分析功能。
涉及Excel写、日志、用户剪切板操作、COM串口读写、GUI界面开发、发布等。

## 源码

```python
#! /usr/bin/python3
# coding:utf-8

import os
import time
import tkinter as tk
from tkinter import ttk
from sys import exit
from tkinter import Menu
from tkinter import filedialog
import logging
from logging import handlers
import traceback
import xlwt
import serial
from tkinter import messagebox
import binascii

class I18N():
    '''Internationalization'''

    def __init__(self, language):
        if language == 'chi':
            self.resourceLagChi()
        elif language == 'eng':
            self.resourceLagEng()

    def resourceLagChi(self):
        self.lab_chi = '中文'
        self.lab_eng = '英文'
        self.lab_trans = '切换语言'
        self.lab_quit = '退出'
        self.lab_start = '开始'
        self.lab_com = 'COM标识'
        self.lab_baud = '波特率'
        self.lab_timeout = '超时（秒）'
        self.btn_test_read = '测试读数'
        self.btn_test_read_remark = '添加备注'
        self.btn_read = '读取数据'
        self.btn_copy = '复制最近10条数据'
        self.app_title = "水分测量"
        self.port_seting_title = "串口设置"
        self.data_read_title = "读取数据"
        self.data_record_title = "数据记录"
        self.data_record_label = "历史记录"
        self.save_to_excel = "将记录写入excel文件"
        self.excel_header_list=["时间","样品序号","样品代号","温度","重量","水分","电压","测量次数","平均标识", "备注"]
        self.com_formate_error="COM接口标识格式不正确"
        self.baud_formate_error="波特率格式不正确"
        self.timeout_formate_error="超时设置不正确"
        self.warn="提示"
        self.messages=["读取成功","没有串口未识别，请调整串口标识","串口读取异常，调整超时和波特率配置", "数据解析异常，联系开发人员", "数据展示异常，联系开发人员"]

    def resourceLagEng(self):
        self.lab_chi = 'Chinese'
        self.lab_eng = 'English'
        self.lab_trans = 'Change Language'
        self.lab_quit = 'Quit'
        self.lab_start = 'Start'
        self.lab_com = 'COM ID'
        self.lab_baud = 'Baud rate'
        self.lab_timeout = 'Timeout (seconds)'
        self.btn_test_read = 'Test reading COM'
        self.btn_read = 'Reading Data'
        self.btn_copy = 'Copy the last 10 data'
        self.app_title = "Moisture measurement"
        self.port_seting_title = "Serial port setting"
        self.data_read_title = "Get Data"
        self.data_record_title = "Data records"
        self.data_record_label = "History records"
        self.save_to_excel = "Write records to excel file"
        self.btn_test_read_remark = 'Remarks reading data'
        self.excel_header_list=["time", "sample number", "sample code", "temperature", "weight", "moisture", "voltage", "measurement times", "average identification", "remark"]
        self.com_formate_error="The COM interface ID format is incorrect"
        self.baud_formate_error="The baud rate format is incorrect"
        self.timeout_formate_error="The timeout setting is incorrect"
        self.warn="Warnning"
        self.messages=[
            "Read successfully",
            "No serial port is not recognized, please adjust the serial port ID",
            "Serial port read timeout, adjust timeout or baudrate configuration",
            "Data resolution exception, contact developer", 
            "Data display exception, contact developer"]

def get_app_log_handler(name):
    applog = logging.getLogger(name)
    rh = handlers.RotatingFileHandler(
        f'{name}.log', maxBytes=1024*1024*100, backupCount=5)
    dfs = '%Y-%m-%d %H:%M:%S %p'
    fs = '%(asctime)s | %(levelname)s|pathname: %(pathname)s|module: %(module)s|funcName: %(funcName)s|lineno: %(lineno)d|pid: %(process)d|tid: %(thread)d|msg: %(message)s'
    app_format = logging.Formatter(fs, dfs)
    rh.setFormatter(app_format)
    applog.addHandler(rh)
    applog.setLevel(logging.DEBUG)
    return applog


applog = get_app_log_handler("app")
errorlog = get_app_log_handler("traceback")

excel_header_list = []
all_read_data = list()
serial_name="COM1"
serial_baud_rate=2400
serial_timeout=5
onece_read_len=60
default_len=10

def format_data_raw():
    s="3D 08 38 02 00 05 01 05 00 01 05 08 06 08 05 01"
    raw_data=""
    for c in s.split():
        cb=bin(int(c, 16))[2:].rjust(8, '0')
        raw_data=f"{raw_data}0{cb}1"

    dst=b""
    for i in range(0,160,8):
        b=raw_data[i:i+8]
        b=hex(int(b, 2))[2:]
        b=b.rjust(2, '0')
        b=binascii.a2b_hex(b)
        dst+=b
    return dst
        

def parse_bytes_data(b_data):
    try:
        time_str=time.asctime()
        sample_No=f"{hex(int(b_data[11:19],2))[2:]}" # 3D 08
        sample_code=f"{hex(int(b_data[21:29],2))[2:]}" # 38
        temperature=f"{hex(int(b_data[31:39],2))[2:]}{hex(int(b_data[41:49],2))[2:]}.{hex(int(b_data[51:59],2))[2:]}" # 02 00 05
        weight=f"{hex(int(b_data[61:69],2))[2:]}{hex(int(b_data[71:79],2))[2:]}{hex(int(b_data[81:89],2))[2:]}" # 01 05 00
        moisture=f"{hex(int(b_data[91:99],2))[2:]}{hex(int(b_data[101:109],2))[2:]}.{hex(int(b_data[111:119],2))[2:]}%" # 01 05 08
        # 3D 08 38 02 00 05 01 05 00 01 05 08 06 08 05 01
        voltage=f"{hex(int(b_data[121:129],2))[2:]}.{hex(int(b_data[131:139],2))[2:]}" # 06 08
        measurement_times=f"{hex(int(b_data[141:149],2))[2:]}" # 05
        avg_flag=f"{hex(int(b_data[151:159],2))[2:]}" # 01

        return [
            time_str, sample_No, sample_code, temperature, weight, moisture,
            voltage, measurement_times, avg_flag]
    except Exception as e:
        errorlog.error(f"parse data error: {e}")
        errorlog.error(traceback.format_exc())


def save_to_excel_action(filenewpath):
    try:
        applog.info(f"ready to write excel {filenewpath}")
        # 创建新的workbook（其实就是创建新的excel）
        workbook = xlwt.Workbook(encoding= 'utf-8')
    
        # 创建新的sheet表
        worksheet = workbook.add_sheet("My new Sheet")

        st_rn=0
        st_cn=0
        row_cn=st_cn
        for h in excel_header_list:
            worksheet.write(st_rn, row_cn,  h)
            row_cn += 1
        
        applog.info(f"write excel header successfully")
        
        for line in all_read_data:
            st_rn +=1
            row_cn=st_cn
            for d in line:
                worksheet.write(st_rn, row_cn,  d)
                row_cn+=1

        # 保存
        workbook.save(filenewpath)
        applog.info(f"write excel data successfully")
    except Exception as e:
        errorlog.error(f"save_to_excel_action error: {e}")
        errorlog.error(traceback.format_exc())


def save_excel():
    try:
        filetypes = [("MincroSoft Excel XLS", "*.xls")]
        # 返回一个 pathname 文件路径字符串，如果取消或者关闭则返回空字符，
        # 返回文件如何操作是后续代码的事情，
        # 该函数知识返回选择文件的文件名字，不具备保存文件的能力
        filenewpath = filedialog.asksaveasfilename(
            title='保存文件',
            filetypes=filetypes,
            defaultextension='.xls',
            initialdir=os.getenv('homepath') or os.getenv('home'))
        applog.info(f"save execl file:{filenewpath} need Action")
        save_to_excel_action(filenewpath)
    except Exception as e:
        errorlog.error(f"save_excel error: {e}")
        errorlog.error(traceback.format_exc())


class OOP:
    """
    主操作界面
    """
    def __init__(self) -> None:
        self.win = tk.Tk()
        self.win.resizable(0, 0)
        self.i18n = I18N('eng')
        global excel_header_list
        excel_header_list=self.i18n.excel_header_list
        self._create_widget()

    def _quit(self):
        self.win.quit()
        self.win.destroy()
        exit()

    def _chi(self):
        self.win.destroy()
        self.win = tk.Tk()
        self.win.resizable(0, 0)
        self.i18n = I18N('chi')
        global excel_header_list
        excel_header_list=self.i18n.excel_header_list
        self._create_widget()

    def _eng(self):
        self.win.destroy()
        self.win = tk.Tk()
        self.win.resizable(0, 0)
        self.i18n = I18N('eng')
        global excel_header_list
        excel_header_list=self.i18n.excel_header_list
        self._create_widget()

    # 创建验证函数
    def check_com(self):
        com=self.com_entry.get()
        if com.startswith("COM") or com.startswith('com'):
           num= com.strip("comCOM")
           if num.isdigit():return
        messagebox.showwarning(
            title=self.i18n.warn, 
            message=self.i18n.com_formate_error)
        self.com_entry.delete(0,tk.END)
        self.com_entry.insert("end", serial_name)
        return False
        
    def check_baud(self):
        global serial_baud_rate
        baud_rate=self.baud_entry.get()
        if baud_rate and baud_rate.isdigit():
           serial_baud_rate=baud_rate
           return
        messagebox.showwarning(
            title=self.i18n.warn, 
            message=self.i18n.baud_formate_error)
        self.baud_entry.delete(0,tk.END)
        self.baud_entry.insert("end", serial_baud_rate)
        return False
        
    def check_timeout(self):
        global serial_timeout
        timeout=self.timeout_entry.get()
        if timeout and timeout.isdigit():
           serial_timeout=timeout
           return True
        messagebox.showwarning(
            title=self.i18n.warn, 
            message=self.i18n.timeout_formate_error)
        self.timeout_entry.delete(0,tk.END)
        self.timeout_entry.insert("end", serial_timeout)
        return False

    def _trans(self):
        pass

    def show_data(self):
        self.test_read_content.delete(*self.test_read_content.get_children())
        st = 0
        for item in all_read_data[-1::-1]:
            self.test_read_content.insert("", st, text=f"{len(all_read_data) - st}", values=item)
            st +=1

    def _read_bin_str(self, ser):
        bin_str_list=[]
        max_read_times=3
        while max_read_times:
            b_data=ser.read(20)
            applog.info(f"data: {binascii.b2a_hex(b_data)}")
            for b in b_data:
                s=bin(b)[2:]
                s=s.rjust(8, '0')
                bin_str_list.append(s)
            self.bin_str+="".join(bin_str_list)
            start_index=self.bin_str.find('0001111011')
            if start_index != -1 and start_index+160 <= len(self.bin_str[start_index:]):
                dst=self.bin_str[start_index:start_index+160]
                self.bin_str=self.bin_str[start_index+160:]
                return dst
            max_read_times -=1
        if self.bin_str:
            messagebox.showwarning(
                title=self.i18n.warn, 
                message=self.i18n.messages[3])
        return ""
            
    def read_from_serial(self):
        code=0
        try:
            serial_name=self.com_entry.get()
            serial_baud_rate=int(self.baud_entry.get())
            serial_timeout=int(self.timeout_entry.get())
            self.bin_str=""
            code=1
            applog.info(f"ready to open Serial port {serial_name} {serial_baud_rate} {serial_timeout}")
            ser = serial.Serial(serial_name, serial_baud_rate, timeout=serial_timeout)
            applog.info(f"Serial open successfully and ready to read {onece_read_len} bytes from serial port")
            code=2
            data = self._read_bin_str(ser)
            if data:
                code=3
                d=parse_bytes_data(data)
                applog.info(f"data: {d}")
                remark = self.remark_entry.get()
                d.append(remark)
                all_read_data.append(d)
                code=4
                self.show_data()
            else:
                raise Exception(f"{data}")
        except Exception as e:
                messagebox.showwarning(title=self.i18n.warn, message=self.i18n.messages[code])
                errorlog.error(f"read_from_serial error: {e}")
                errorlog.error(traceback.format_exc())

    def _flag(self):
        pass


    def copy_last_10_clipboard(self):
        try:
            data = ""
            headline='\t'.join(self.i18n.excel_header_list)
            for d in all_read_data[-10:]:
                s ='\t'.join(d)
                data=data+s+"\n"
            data=f"{headline }\n{data}"
            # cb.copy(data)
            self.win.clipboard_append(data)
        except Exception as e:
            errorlog.error(f"copy_last_10_clipboard error: {e}")
            errorlog.error(traceback.format_exc())


    def _create_widget(self):
        self.menuBar = Menu(self.win)
        self.win.configure(menu=self.menuBar)
        self.win.title(self.i18n.app_title)
        # self.win.iconbitmap(r'../app.ico')
        self.startMenu = Menu(self.menuBar, tearoff=0)
        # pop menus：
        # 这个是 Menu 中的 Menu 了，可以一直这样嵌套下去
        self.I18NMenu = Menu(self.startMenu, tearoff=0)
        self.I18NMenu.add_command(
            label=self.i18n.lab_chi, command=self._chi)
        self.I18NMenu.add_command(
            label=self.i18n.lab_eng, command=self._eng)
        self.startMenu.add_cascade(
            label=self.i18n.lab_trans, menu=self.I18NMenu)

        self.startMenu.add_command(
            label=self.i18n.lab_quit, command=self._quit)
        self.menuBar.add_cascade(
            label=self.i18n.lab_start, menu=self.startMenu)

        self.tabControl = ttk.Notebook(self.win)
        self.com_test_tab = ttk.Frame(self.tabControl)
        self.tabControl.add(self.com_test_tab,
                            text=self.i18n.app_title)
        self.tabControl.pack(fill='both', expand=1)

        self.seting_frm = ttk.Frame(self.com_test_tab)
        self.seting_frm.grid(column=0, row=0)
        self.com_label = tk.Label(self.seting_frm, text=self.i18n.lab_com)
        self.baud_label = tk.Label(self.seting_frm, text=self.i18n.lab_baud)
        self.timeout_label = tk.Label(
            self.seting_frm, text=self.i18n.lab_timeout)
        self.com_label.grid(row=0, column=0)
        self.baud_label.grid(row=1, column=0)
        self.timeout_label.grid(row=2, column=0)
        # 创建动字符串
        com_String = tk.StringVar()
        baud_String = tk.StringVar()
        timeout_String = tk.StringVar()
        # 使用验证参数 validata,参数值为 focusout 当失去焦点的时候，验证输入框内容是否正确
        # slef.com_entry = tk.Entry(self.seting_frm,textvariable =Dy_String,validate ="focusout",validatecommand=check)
        self.com_entry = tk.Entry(
            self.seting_frm,  width=65,validate ="focusout",validatecommand=self.check_com)
        self.com_entry.delete(0, tk.END)
        self.com_entry.insert("end", serial_name)
        self.baud_entry = tk.Entry(self.seting_frm,  width=65,validate ="focusout",validatecommand=self.check_baud)
        self.baud_entry.delete(0, tk.END)
        self.baud_entry.insert("end", f"{serial_baud_rate}")
        self.timeout_entry = tk.Entry(self.seting_frm, width=65,  validate ="focusout",validatecommand=self.check_timeout)
        self.timeout_entry.delete(0, tk.END)
        self.timeout_entry.insert("end", f"{serial_timeout}")
        self.com_entry.grid(row=0, column=1)
        self.baud_entry.grid(row=1, column=1)
        self.timeout_entry.grid(row=2, column=1)

        for child in self.seting_frm.winfo_children():
            child.grid_configure(padx=6, pady=6, sticky='W')

        self.test_read_frm = ttk.Frame(self.com_test_tab)
        self.test_read_frm.grid(column=0, row=1)

        self.read_btn_frm=ttk.Frame(self.test_read_frm)
        self.read_btn_frm.grid(column=0, row=0)
        self.read_tree_frm=ttk.Frame(self.test_read_frm)
        self.read_tree_frm.grid(column=0, row=1)
        # self.test_read_button = ttk.Button(self.test_read_frm, text='试读串口', command=self._getIptFileName)
        self.remark_label = tk.Label(self.read_btn_frm, text=self.i18n.btn_test_read_remark)
        self.remark_entry = tk.Entry(self.read_btn_frm, width=30)
        self.test_read_button = ttk.Button(
            self.read_btn_frm, text=self.i18n.btn_test_read,
             command=self.read_from_serial)
        
        self.copy_button = ttk.Button(
            self.read_btn_frm, text=self.i18n.btn_copy, command=self.copy_last_10_clipboard)
        
        self.save_btn = tk.Button(
            self.read_btn_frm, text=self.i18n.save_to_excel, command=save_excel)
        
        self.save_btn.grid( column=4, row=0)   
        self.copy_button.grid(column=3, row=0)
        self.test_read_button.grid(column=2, row=0)
        self.remark_label.grid(column=0, row=0)
        self.remark_entry.grid(column=1, row=0)

        for child in self.read_btn_frm.winfo_children():
            child.grid_configure(padx=6, pady=6, sticky='W')


        self.test_read_content = ttk.Treeview(self.read_tree_frm, columns=5)      # #创建表格对象
        self.test_read_content["columns"] =   self.i18n.excel_header_list
        for index in range(0, len(self.test_read_content["columns"])):
            if self.test_read_content["columns"][index] in("时间", "time"):
                self.test_read_content.column(self.test_read_content["columns"][index], width=200)
            else:
                self.test_read_content.column(self.test_read_content["columns"][index], width=100)
            self.test_read_content.heading(self.test_read_content["columns"][index], text=self.i18n.excel_header_list[index])

        self.test_read_content.grid(column=0, row=0)

        for child in self.test_read_frm.winfo_children():
            child.grid_configure(padx=6, pady=6, sticky='W')
        
        if all_read_data:
            self.show_data()


oop = OOP()
oop.win.mainloop()

```

