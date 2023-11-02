# HANA

# SAP HANA Core Data Services (CDS) Reference

在 SAP HANA 中定义和使用语义丰富的数据模型

* 注释

  * [Catalog](https://help.sap.com/docs/SAP_HANA_PLATFORM/09b6623836854766b682356393c6c416/undefined/docs/SAP_HANA_PLATFORM/09b6623836854766b682356393c6c416/8217aac86d9748d8b034797ecc8065b6.html?locale=en-US&version=2.0.02#%40catalog)

    *  

      * **@Catalog.index**Specify the type and scope of index to be created for the CDS entity, for example: name, order, unique/non-unique
      * **@Catalog.tableType**Specify the table type for the CDS entity, for example, column, row, global temporary.

        *  

          * #COLUMN创建基于列的表。如果大多数 表访问是通过大量元组进行的，只有少数元组 选定的属性中，对表类型使用基于列的存储。
          * #ROW创建基于行的表。如果表的大多数 访问涉及选择一些记录，并选中所有属性， 对表类型使用基于 ROU 的存储。
          * #GLOBAL_TEMPORARY设置创建表的范围。 **全局**临时表中的数据为 特定于会话;仅全局临时表的所有者会话 允许插入/读取/截断数据。全局临时表 在会话期间存在，并且来自全局的数据 会话终止时，将自动删除临时表。 仅当全局临时表未删除时，才能删除该表。 里面有任何记录。
  * entity

    * technical configuration

      * ‍
* 概念

  * **OLTP和OLAP**主要区别有：

    1、基本含义不同：OLTP是传统的关系型数据库的主要应用，主要是基本的、日常的事务处理，记录即时的增、删、改、查，比如在银行存取一笔款，就是一个事务交易。OLAP即联机分析处理，是数据仓库的核心部心，
  * **ITAB**: 内部表格（Internal Table）的意思。内部表格是SAP ABAP编程语言中的一种数据结构，用于在内存中存储数据记录。
  * **锁（Locks）**是用于管理并发访问和保护数据库对象免受意外或不正确的更改的重要机制。锁可以防止多个会话同时修改或访问相同的数据库资源，以确保数据的一致性和完整性。

    * 以下是SAP HANA数据库中常见的锁类型：

    1. **排他锁（Exclusive Locks）：** 排他锁是最严格的锁类型。当一个事务持有排他锁时，其他事务不能获取相同资源的任何类型的锁。这确保了只有一个事务可以修改资源。
    2. **共享锁（Shared Locks）：** 共享锁允许多个事务同时读取相同资源，但不允许任何事务获得排他锁。这用于保护读取操作，以便多个事务可以同时读取，但不能同时修改。
    3. **意向锁（Intent Locks）：** 意向锁是用于指示一个事务计划获得排他锁或共享锁的锁类型。当一个事务计划获取锁时，它首先会请求意向锁。如果意向锁被占用，其他事务知道至少有一个事务计划获得了锁。
    4. **行级锁（Row-Level Locks）：** 行级锁允许在表的行级别上进行锁定。这意味着一个事务可以锁定表中的一部分行，而不会影响其他行。这种锁通常用于处理高度并发的 OLTP（联机事务处理）应用。
    5. **表级锁（Table-Level Locks）：** 表级锁会锁定整个表，防止其他事务访问表中的任何行。这通常用于支持特殊类型的操作，如表的结构更改。
    6. **分区级锁（Partition-Level Locks）：** 分区级锁允许在分区级别上进行锁定。在分区表中，可以在单个分区上应用锁，以阻止其他事务访问该分区
  * [LOCK TABLE Statement (Transaction Management) | SAP Help Portal](https://help.sap.com/docs/SAP_HANA_PLATFORM/4fe29514fd584807ac9f2a04f6754767/20f88d8d75191014a51abbaa4e3d36cb.html?locale=en-US)
  * Cost-Based Optimization
  * SET TRANSACTION
  * CS(列存储), RS(行存储)
  * 存储过程

    * IN 入参可以指定为复杂类型（如table）
    * LANGUAGE [SQLSCRIPT]
    * SQL SECURITY [INVOKER]

      * 指定存储过程使用调用者的权限来执行，而不是定义存储过程的用户的权限。
    * DEFAULT SCHEMA [ADDSC]
    * ​`DECLARE EXIT HANDLER FOR SQLEXCEPTION`​：这是一个声明，用于指定接下来的代码将处理 SQL 异常。`SQLEXCEPTION`​ 是一种异常类型，表示与 SQL 执行相关的异常，例如语法错误、数据访问问题、权限问题等。
* context

  * the name of the CDS document must match the name of the context defined in the CDS document
* 系统表

  * TABLES
  * M_CS_PARTITIONS systeam view

    Provides partition information of column tables.
  * M_OBJECT_LOCKS系统视图  
    提供对象上当前获取的锁的状态以及详细信息 如锁定获取时间和锁定模式。
  * Cache; M_SQL_PLAN_CACHE
  * Explain Plan; EXPLAIN_PLAN_TABLE,
  * 版本 M_DATABASE;[M_DATABASE System View | SAP Help Portal](https://help.sap.com/docs/SAP_HANA_PLATFORM/4fe29514fd584807ac9f2a04f6754767/20ae63aa7519101496f6b832ec86afbd.html?locale=en-US&q=M_DATABASE)
  * 配置**​ ​**​`M_INIFILE_CONTENTS`​
* namesapce

  * the namespace specified at the start of the file,
  * ```undefined
    namespace 'name2'
    @Schema 'schema1'
    context M{
    entity OME{};

    };
    ```
  * SELECT * FROM "schema1"."name2::M.one"

# 函数

* LOAD 

  * LOAD <table_name> {DELTA | ALL | (<column_name>, ...)}
  * LOAD 语句明确地加载列式存储表的数据至内存中，而非第一次访问时加载
* 符号

  * ： 修饰变量名
  * ::=定义运算符用于提供元素的定义
  * || 拼接字符串
  * DUMMY 虚表
  * ​`"$rownid$"`​​​​ --rowid

    * ROW_NUMBER() --rownum
* SEQUENCE

  * 序列(SEQUENCE)是序列号生成器，可以为表中的行自动生成序列号，产生一组等间隔的数值(类型为数字)。不占用磁盘空间，占用内存。

    其主要用途是生成表的主键值，可以在插入语句中引用，也可以通过查询检查当前值，或使序列增至下一个值
  * NEXTVAL 返回序列中下一个有效的值，任何用户都可以引用。
  * CURRVAL 中存放序列的当前值,NEXTVAL 应在 CURRVAL 之前指定 ，二者应同时有效。
  * 调用NEXTVAL将生成序列中的下一个序列号，调用时要指出序列名，即用以下方式调用: 序

    列名.NEXTVAL
* 数据类型与数据类型转换函数

  * 数据类型

    * VARCHAR 类型包含 ASCII 字符串，而 NVARCHAR 用来存储 Unicode 字符串
  * CAST

    * CAST (expression AS data_type)
    * Expression – 被转换的表达式。Data type – 目标数据类型。
  * TO_DATE
  * TO_VARCHAR

    * TO_VARCHAR (value [, format]), 将给定value(如数值） 转换为VARCHAR 字符串类型
  * TO_DECIMAL 将字符串转为数字
  * TO_INTEGER：转换为整数。
* 数字

  * SIN, ASIN

    * 以弧度为单位
  * LN

    * 对数，返回参数n 的自然对数。
  * POWER
  * ROUND

    * ROUND (n [, pos])  
      描述：  
      返回参数n 小数点后pos 位置的值。
  * CEIL

    * CEIL(n)  
      描述：  
      返回大于或者等于n 的第一个整数。
* 字符串

  * LCASE 

    * 函数作用与LOWER 函数相同。将字符串str 中所有字符转换为小写
  * LOCATE

    * LOCATE (haystack, needle)  
      描述：  
      返回字符串haystack 中子字符串needle 所在的位置。如果未找到，则返回0。
  * UCASE

    * ：UCASE 函数作用与UPPER 函数相同。将字符串str 中所有字符转换为大写
  * LPAD

    * LPAD (str, n [, pattern])
    * 从左边开始对字符串str 使用空格进行填充，达到n 指定的长度。如果指定了pattern 参数，字符串str 将按顺序填pattern充直到满足n 指定的长度。
  * TRIM

    * TRIM ([[LEADING | TRAILING | BOTH] trim_char FROM] str )
    * 返回移除前导和后置空格后的字符串 str。截断操作从起始(LEADING)、结尾(TRAILING)或者两端(BOTH)执行。
    * SELECT TRIM ('a' FROM 'aaa123456789aa') "trim both" FROM DUMMY;
  * REPLACE (original_string, search_string, replace_string)  

    * 描述：  
      搜索original_string 所有出现的search_string，并用replace_string 替换。
* 日期

  * ADD_DAYS

    * ADD_DAYS (d, n)，计算日期d 后n 天的值。
  * WEEKDAY (d)

    * 描述：,  
      返回代表日期d 所在星期的日期数字,返回值范围为0 至6，表示Monday(0)至Sunday(6)。
  * CURRENT_DATE--当前时间（yyyy--mm-dd）
  * NANO100_BETWEEN

    * ​`NANO100_BETWEEN(<timestamp_1>, timestamp_2)`​​​​​​​
    * 计算两个日期之间的时间差，精度为 0.1 微秒。
  * SECOND (t)

    * 返回时间 t 表示的秒数。
  * SECONDS_BETWEEN (d1, d2)

    * 计算两个日期之间的秒数，语义上等同于 d2-d1。
* 正则

  * ‍
  * SUBSTR_REGEXPR

    * 在字符串中搜索正则表达式模式，并返回匹配的子字符串。
    * SUBSTR[ING]_REGEXPR( <pattern> [ FLAG <flag> ] IN <regex_subject_string>  
       [ FROM <start_position> ]--起始位置  
       [ OCCURRENCE <regex_occurrence> ]--第几次出现  
       [ GROUP <regex_capture_group> ] )
* map

  * MAP (expression, search1, result1 [, search2, result2] ... [, default_result])
  * 在搜索集合中搜索expression，并返回相应的结果。  
    如果未找到expression 值，并且定义了default_result，则MAP 返回default_result。  
    如果未找到expression 值，并且未定义default_result，MAP 返回NULL。
* GREATEST (n1 [, n2]...)  

  * 返回参数n1,n2,…最大数。

# 语句

* DDL

  * ALTER TABLE

    * ALTER TABLE <table_name>

      {

      <add_column_clause>

      | <drop_column_clause>

      | <alter_column_clause>  
      ----
    * <table_name> ::= [<schema_name>.]<identifier>

      <add_column_clause> ::= ADD ( <column_definition> [<column_constraint>], ...

      )

      <drop_column_clause> ::= DROP ( <column_name>, ... )
* DML

  * 清空：TRUNCATE TABLE <table_name>
* 循环：

  * FOR  C_BATCH_DMD IN 1 .. V_MAX_LOOP DO  
    END FOR
  * FOR C_INV AS C_INV_LEAVE DO
  * 逆序：FOR C_LVL1 IN **REVERSE** 0 .. V_MAX DO
  * WHILE 1 = 1 DO  
    END WHILE;
* 分区

  * PARTITION BY  
    使用RANGE, HASH RANGE, ROUNDROBIN RANGE 对表进行分区。关于表分区自居，请参见CREATE
  * 四种常见的分区类型：

    * range,**RANGE分区**最为常用，基于属于一个给定连续区间的列值，把多行分配给分区。最常见的是基于时间字段。
    * ‍
  * DROP PARTITION VALUES （）

    * ALTER TABLE sales DROP PARTITION VALUES ('2022');  
      ​`DROP PARTITION VALUES`​​ 是 `DROP PARTITION`​​ 命令的一部分，它指定了要删除的分区的条件。这个条件通常是基于分区键列的值。例如，如果您有一个按年份分区的表，您可以使用以下命令删除特定年份的分区：
* order

  * ASC 用于按升序排列记录，  
    DESC 用于按降序排列记录。默认值为ASC。
* 导出

  * EXPORT <object_name_list> AS <export_format> INTO <path> [WITH <export_option_list>]
* "execute immediate"

  *  为了在存储过程中执行动态SQL
  * 该语句可以在程序的运行时动态地执行SQL语句，它可以用于执行包含变量的动态SQL语句，或者在运行时根据不同的条件执行不同的块。
* 虚表

  * 远程源(Remote sources)是与其他数据库的连接。 虚拟表使用远程源创建指向存储在另一个数据库中的数据的本地表
  * **create** virtual **table** ATP.MRP.VT_BOM **AT** PRDMDMN_19C."NULL".PRDPCDW.ECC_BOM;
  * **CALL ZCREATE_VT ('create virtual table &quot;ADDSC&quot;.&quot;VT_DNS_MRP_SUPPLY&quot; AT &quot;TSTMDMN_19C&quot;.&quot;NULL&quot;.&quot;PRDPCDW&quot;.&quot;IN_DCSC_CTO_SUPPLY_BATCH&quot;;');**
  * 更新字段：**alter virtual table addsc.VT_ASN_VIEW refresh definition;**
* 异常

  * ​`SQL_ERROR_CODE`​​ 和 `SQL_ERROR_MESSAGE`​​ 是用于处理SQL异常的系统变量，
  * DECLARE EXIT HANDLER FOR SQLEXCEPTION

    * 这个语句用于指定一个处理程序（handler），以捕获并处理SQL异常。当在存储过程中的某个SQL语句发生异常时，存储过程会尝试执行该异常处理程序中定义的代码块，而不是立即终止存储过程的执行
    * ```undefined
      DECLARE EXIT HANDLER FOR SQLEXCEPTION
      BEGIN
        -- 处理异常的代码
        ROLLBACK; -- 回滚事务，或执行其他异常处理操作
        INSERT INTO error_log (message) VALUES ('An SQL exception occurred');
      END;

      ```

# 性能

## 1.schema design

* 默认列存储
* （inverted value index）、倒排哈希索引（inverted hash index）和倒排个别索引（inverted individual index）
* 分区

  * ‍
* 增量表和主表

  * 数据压缩
* 反规范化

  * 以避免连接处理的开销。

## 2.Query Execution Engine

* 引擎

  * ​![image](assets/image-20230921095641-h69u3oe.png)
  * ​
* ESX

  * ​![image](assets/image-20230921095858-jah191h.png)​
* Disabling the ESX and HEX Engines

  * SELECT * FROM T1 WITH HINT(USE_ESX_PLAN);

    SELECT * FROM T1 WITH HINT(NO_USE_HEX_PLAN);

## 3.SQL Query Performance

* sql process

  * The SAP HANA SQL process starts with a SELECT statement, which is then looked up in the cache, parsed, checked, optimized, and made into a final execution plan.
  * ​![image](assets/image-20230921101624-4ts9qra.png)​
  * ‍
* SAP HANA SQL Optimizer -- rule-based and cost-based optimization.

  * Rule-Based Optimization

    * Remove Group By
    * Remove JOIN
    * Heuristic Rules
  * Cost-Based Optimization

    * Logical Enumeration

      * ‍
    * Physical Enumeration（物理枚举）

      * CS_ or RS_
      * Cyclic Join 循环连接
      * REMOTE
    * Column Search

      * 可以在单个IMS搜索调用中进行操作。IMS搜索调用是从SQL引擎到列引擎的请求，通常使用查询执行计划（QE）。
      * **Singular Versus Stacked Column Search**：单列搜索是只有一个列搜索，而堆叠列搜索是多个列搜索堆叠在一起的情况。
      * 注意，在优化过程中，SQL优化器不考虑与内存管理和CPU相关的方面。
  * ​![image](assets/image-20230922103925-buqqoh9.png)​
  * ‍
* Analysis Tools

  * SQL Plan Cache

    * 不同的客户端会创建不同的高速缓存条目
  * Explain Plan; EXPLAIN_PLAN_TABLE,

# 问题记录

* 锁争用问题

  1. **优化事务设计：** 考虑将事务拆分成较小的、更短的事务，以减小锁争用的可能性。
  2. **调整锁策略：** 了解数据库的锁机制，并确保正确配置了锁类型和锁级别。有时，可以通过更改锁策略来减少锁冲突。
  3. **增加超时时间：** 考虑增加事务的锁等待超时时间，但要小心不要设置得太长，以防止长时间的锁等待。
  4. **监视数据库性能：** 使用数据库性能监视工具来跟踪锁争用情况，以及哪些事务或查询可能导致锁等待问题。
  5. **检查数据库索引：** 确保数据库表上的索引得到了正确的设计和维护，以减少查询时的锁冲突。
  6. **使用事务隔离级别：** 在某些情况下，通过将事务隔离级别设置为较低级别（如READ COMMITTED）可以减少锁争用问题。

# hana studio

* systeam

  * •Security  
    Contains the roles and users defined for this system.

    •Catalog  
    Contains the database objects that have been activated, forexample, from design-time objects or from SQL DDL statements. The objectsare divided into schemas, which is a way to organize activated databaseobjects.

    •Provisioning  
    Contains administrator tools for configuring smartdata access, data provisioning, and remote data sources

    •Content  
    Contains design-time database objects, both those that havebeen activated and those not activated. If you want to see other developmentobjects, use the Repositories view.
* 显示

  * [HANA Studio中修改默认查询结果只显示1000行_期待小橙子的博客-CSDN博客](https://blog.csdn.net/u011277548/article/details/88839701)
  * [HANA中显示代码所在行数_hana 行号_阿凡图的博客-CSDN博客](https://blog.csdn.net/weixin_48102677/article/details/125313218)
* 导入导出

  * 导出数据

    * 从查询结果导出

      * 右键，export result
      * 转换为excel: excel-数据-来源于文件, 以分号分隔

        * 如果字段内有分号会有错误

          * 解决1：导出时改字段

            * ```sql
              SELECT GRPID,MATNR,WERKS,REPLACE(MAKTX,';',',') MAKTX, BEGDA,PRIORITY,ENDDA,PROPORTION,SCHGT,ITEM_STATUS,
              SYS_CREATION_DATE,SYS_CREATION_BY,SYS_LAST_MODIFIED_DATE,SYS_LAST_MODIFIED_BY,
              SYS_CREATION_DATE_BK,VALID_DATE_MODIFIED,AIGID
              FROM "mrp.data::UD.PIG_I_BK" T1
              WHERE WERKS = 'X470' 
              AND SYS_CREATION_DATE_BK = 
              	(SELECT MIN(SYS_CREATION_DATE_BK) 
              	  FROM "mrp.data::UD.PIG_I_BK" T2
              	  WHERE T1.GRPID = T2.GRPID
              	  GROUP BY GRPID)
              ```
  * 导入数据

    * 从本地excel import

      *  https://blog.csdn.net/XLevon/article/details/128935598
      * 删除excel多余的行和列
      * 选择环境，导入数据到新表
      * 或到原有的表

        * 进行map，excel的data数据等可能与hana不匹配
        * 指定key防止重复
* 新建存储过程

  * 右键-new-other-搜索proc
* team

  * activate --语法检查
* sql

  * ‍

# PROJECT-MRP

PIG->SNAPSHOT->REPORT

* 名词解释

  * MRP, material requirement planning物料需求计划
  * RP, 需求计划
  * 物料主数据（Material Master Data， MMD）的基本视图（Basic Data View）是维护一个物料的最为基本的数据，也就是无组织机构数据，包括物料类别、物料编号、名称、计量单位等。这些数据不会因为不同的组织机构（如工厂、库存地点）改变而改变。
  * SUP 供应
  * DMD 需求
  *   ITEMGROUP
  * |BULK|一种item type|
    | ------| ---------------|
  * BOM USAGE物料清单使用情况
  * FCST 预测
  * compress 压缩
* 注意

  * 同样的item可以用与不同的werks, 可以用item+werks确定唯一的物料
  * 一个DMD_ID可能包括对不同工厂的产品需求
  * DMD需要的product为SBB(之后从BOM_ORIORITY中插入虚拟物料DUMMY),DMD_ID最小的优先级最大
  * MENGE_PT_SPLIT代表替代分割比例,在BOM_ORI, BOM_P1中有该字段，PROPORTION为采购比例,再ITEMGROUP中，同一个GROUP中相加为1. 在采购PR时考虑，在计BOM_P1的PR时使用MENGE_PT_SPLIT作为PROPORTION

    * ITEMGROUP中，不同ITEM优先级不同，同一个GROUP中PROPORTION相加为1
  * BOM 的LVL从1开始，压缩后BOM_WITHOUT_BULK_P2只有两层,BOM_ORIORITY无LVL，BOM_ORI为多层，BOM_P2为两层
* SNP master data

  * |Where theSNPmaster datamustbe maintained?|
    | ------------------------------------------------------------------|
    |1. Safetystockmethod and safety days supply|
    |2. Safetystockhorizon|
    |3. HUBpart identifier|
    |4. SBBbuffer–goods recipienttime (GR time)|
    |5. Component buffer–planned deliverytime (PDT)à product level|
    |6. Component buffer–planned deliverytime (PDT)à supplier level|
    |7. Minimumlot size(MOQ)à product level|
    |8. Rounding value(MPQ)à product level|
    |9. Minimumlot size(MOQ)à supplier level|
    |10.Rounding value(MPQ)à supplier level|
* 数据结构 .hdbdd file

  * UD

    * CONF_PARAMETER--MRP库位配置表（库位：仓库中货品的具体存放位置）

      * PART1--工厂
      * PART2--LGORT库存地
    * BUCKET

      * BKT_ID--时间（周）
      * BUCKET--日期
    * DEMAND

      * BKT_ID--FCST日期（周）
      * CATEGORY IN ('ORDER','FORECAST')
      * GEO--地点
    * SUPPLY

      * LOI
      * SOI
      * UNRES_QTY, INSPE_QTY, BLOCK_QTY, TTL_QTY(总计的),
      *  SUPPLIER
    * SUPPLIER

      * QUOTA--配额
    * ITEMGROUP

      * LOCATION --= P_IN_SITEID
    * MMR

      * ITEMTYPE (MTM,SBB,COMPONENT,OPTION,CTO,BULK)
      * SHZET, --Safety time (in workdays)  
                   KZKRI, --Indicator: Critical part  
                   WEBAZ, --Goods Receipt Processing Time in Days--GR  
                   PLIFZ, --Planned Delivery Time in Days  
                   BSTMI, --Minimum Lot Size  
                   BSTMA, --Maximum Lot Size  
                   BSTFE, --Fixed lot size  
                   BSTRF --Rounding value for purchase order quantity
    * FCST
    * CAL_CASE1_INV_DETAIL(库存)

      * SUP_COMP --供应
      * PR--采购请求
      * DMD_SBB_UNMET--未满足需求量
      * MENGE_F
      *  FLAG IN ('SBB/OPT->COMP' ,)
    * BOM_ORI

      * LVL--level
      * ALPGR--Alternative ITEM GROUP
      * DATUV-- Validity date(有效开始日)
      * DATUB--VAlid to dateo'(有效日期至)
      * BOM usage(BOM 用途)
      * PARENT --parent
      * PATH
      * BESKZ--in（F, E）
    * BOM_PRIORITY

      * BOMID --无ALPGR则为1,否则为替代组中物料数目
  * MID

    * BOM_DMD_BATCH
    * ‍
* snaphost流程

  * 读入inv, mmr, po,itemgroup
  * INV

    * INSERT INTO "mrp.data::SNP.INV"  
      FROM PCDW.PUBLIC.MARD ---LOI
    *    --SOI
  * MMR

    * INSERT INTO "mrp.data::SNP.MMR"  
      FROM PCDW.PUBLIC.MARC
  * itemgroup

    * INSERT INTO "mrp.data::SNP.ITEMGROUP"  
      from PIG
* report流程

  * 1 读入数据

    * 1.1 读入MMR

      * insert UD.BUCKET from table
      * insert UD.MMR FROM SNP.MMR
      * UD.SUPPLIER from MMR,  LT_CONTRACT, UI.SUPPLIER_QUOTA 包含Dummy
      * UD.WORKDAY
      * INSERT INTO UD.SBB_OPT_LIST FROM MMR WHERE ITEMTYPE IN ( 'SBB','OPTION')
      * INSERT INTO "mrp.data::UD.MISC_LIST" FROM "mrp.data::UD.MMR" WHERT  ITEMTYPE = 'COMPONENT'
    * 1.2 读入DMD

      * insert DMD FROM FCST 计算REQQTY 生产DMD_ID
      * UPDATE "mrp.data::UD.DEMAND" T1  
             SET (T1.BKT_ID_GR) =  
                 (SELECT T2.BKT_ID
    * 1.3 读入SUP

      * 根据库存类型INV_TYPE读取 

        * 对SOI与LOI类型分别计算SUM(T1.LABST + T1.UMLME+ T1.INSME) AS TTL_QTY
        * insert SUPPLY_SUM 再分别计算SOI与LOI的QTY(数量)：
    * 1.4 读入GRP

      * INSERT INTO UD.ITEMGROUP FROM SNP.ITEMGROUP
  * 2 处理BOM

    * 2.1 原始BOM(BOM_ORI)?

      * TAB_BOM(原始BOM) FROM MRP.ECC_BOM,  MMR,按时间整理

        * 根据MMR和ECC_BOM得到初步的BOM
      * BOM_ORI(Level 1) FROM TAB_BOM, SBB_OPT_LIST--只计算Phantom层替代，F层的由PIG计算

        * 计算ID,PATH，MENGE_PT_SPLIT（替代分割比例）
        * '/' || T1.NAME || '/' || T1.IDNRK AS PATH,
      * BOM_ORI(Other Level)

        * 计算ID. PATH,PARENT
        * 只展开到第一层F料
      * F料,搭建自己的BOM

        * INSERT INTO "mrp.data::UD.BOM_ORI"  
          FROM "mrp.data::UD.SBB_OPT_LIST"  
          WHERE BESKZ = 'F'
        * 计算ID
      * MISC物料，搭建自己的BOM

        * FROM "mrp.data::UD.MISC_LIST"  
          WHERE BESKZ = 'F'
      * 获取每层有效期

        * IFNULL(SUBSTR_REGEXPR('[^/]+' IN PATH_DATUV FROM 1 OCCURRENCE 1), '1971-01-01'),
    * 2.2 压缩BOM

      * 2.2.0

        * BOM_ORI_WITHOUT_BULK--删掉BULK后的完整BOM

          * MENGE_PT_SPLIT_UP --上一层的MENGE_PT_SPLIT
          * where NOT EXISTS (SELECT 1  
                          FROM "mrp.data::UD.MMR" T2  
                         WHERE T1.IDNRK = T2.ITEM  
                           AND T2.SITEID = P_IN_SITEID  
                           AND T2.ITEMTYPE = 'BULK');  
                           AND ISLEAF = 1--最底层
        * insert BOM_ORI_WITHOUT_BULK_P1--删掉BULK后,只保留整枝都没有替代的F料,预测会直接展到这些F料上(用量从顶层乘到底层)

          * BOM中整枝都没有替代关系,则只保留最底层F料 （LENGTH(REPLACE(PATH_ALPGR, '/', '')) = 0）  
              AND AND ISLEAF = 1
          * 整支有替代，但当前PART没替代

            * INSERT INTO "mrp.data::UD.BOM_ORI_WITHOUT_BULK_P1"

              where LENGTH(REPLACE(PATH_ALPGR, '/', '')) > 0  
                     AND ALPGR IS NULL;  
                     AND ISLEAF = 1
            * ‍
        * delate MID_BOM_ORI_WITHOUT_BULK_P2

          * 删掉BULK后,再删掉整枝都没有替代的F料
          * 删掉最底层F料后上层E料仍在,要删除整支BOM
        * insert BOM_ORI_WITHOUT_BULK_P2

          * 1.将 BOM_ORI_WITHOUT_BULK_P2中所有替代物料的上层物料替换成dummy物料  
            insert BOM_ORI_WITHOUT_BULK_P2  
            DUMMY_' || ROOT || '_' || NAME || '_' || IFNULL(ALPGR,'') AS ROOT,NAME  
            1 AS LVL  
            from MID_BOM_ORI_WITHOUT_BULK_P2  
            WHERE WERKS = P_IN_SITEID  
                   AND ALPGR IS NOT NULL;
          * 2更新BOM_ORI_WITHOUT_BULK_P2中DUMMY料下层的物料的root与LVL
        * INSERT INTO "mrp.data::UD.DEMAND"

          * 根据Root得到dummy物料的需求并更新需求（DUMMY BOM AND DUMMY DEMAND）  
            DMD_PRIORITY * 100000000 + S1.DMD_ID AS DMD_ID AS DMD_ID  
            FROM "mrp.data::UD.BOM_ORI_WITHOUT_BULK_P2"
        * 对每个SBB

          * INSERT "mrp.data::UD.BOM_2COMPRESS_T1" FROM "mrp.data::UD.BOM_ORI_WITHOUT_BULK_P2"
          * 对2-10层

            * 上移。CALL "mrp.procedures.report::02_BOM_2COMPRESS_1MOVEUP"(C_LVL);
            * 枚举所有组合
      * 2.2.1从最底层往上处理到第二层,只处理相同FATHER下的BOM,将层上移

        * 上移：UPDATE "mrp.data::UD.BOM_2COMPRESS_T1"  
                         SET LVL = LVL - 1, MENGE=MENGE*MENGE(上一层)
        * 更新层级/替换组路径

          * INSERT INTO "mrp.data::UD.BOM_2COMPRESS_T4"
      * 2.2.2 枚举所有组合
      * 2.2.3

        * INSERT INTO "mrp.data::UD.BOM_COMBINATIONS"
    * 优先级BOM_PRIORITY

      * INSERT INTO BOM_PRIORITY FROM BOM_COMBINATIONS
      * 根据ITEMGROUP的PRIORITY计算ITEM_PRIORITY, BOM_PRIORITY
  * 3计算RP

    * 3.1 消耗库存

      * 根据物料是否有替代分别计算
      * 流程

        * 1. 不同SBB下有公用料的合并SBB为同一批

          * UPDATE "mrp.data::MID.BOM_DMD_BATCH"
          * 不同batch中，SBB不同，DMD_ID也必然不同
          * 循环,（batch不连续）

            * C_CNT计数
        * 2.BOM中整枝都没替代，则FCST直接展到F料上

          * insert CAL_CASE1_INV_DETAIL,直接计算F料的PR
          * FROM "mrp.data::UD.DEMAND"   
            				      JOIN "mrp.data::UD.BOM_ORI_WITHOUT_BULK_P1"

            ‍
          * 计算需求

            * T1.REQQTY AS DMD_SBB,  
              REQQTY * T2.MENGE_F AS DMD_COMP,
        * 3.提前关联好BOM,过滤掉没SUPPLY的BOM组合（只包含有替代料的BOM）

          * INSERT INTO "mrp.data::MID.BOM_DMD" FROM JOIN "mrp.data::UD.BOM_PRIORITY"  
            (SUP,DMD)

            * WHERE BKD_ID
          * 计算DMD_SBB
          * 计算SUP(ITEM级)
          * 计算STATUS是否为0以判断(是否有LOI 或 LOI不足，）
        * 4.根据BOM_DMD_BATCH更新MID.BOM_DMD，合并有公用料的SBB为同一批

          * 对同一批次内所有DEMAND+BOMID排序编号为 BATCH_DMD,最大编号就是最大循环次数 ORDER BY T1.BKT_ID, T1.DMD_ID, T1.BOM_PRIORITY
        * 5.由1至循环max(BATCH_DMD)循环,消耗库存（不同batch可以并行计算）

          * INSERT INTO "mrp.data::MID.CAL_CASE1_INV_DETAIL"

            * 计算(SUP_ORI是ITEM级别的)
            * T1.DMD_SBB,  --原始SBB需求
            * T1.SUP_ORI - IFNULL(T2.SUP_COMP_CONSUMED, 0) AS SUP_COMP,  --当前COMP库存
            * SUM(DMD_SBB_MET) AS DMD_SBB_MET--已满足需求
            * T1.DMD_SBB - IFNULL(T3.DMD_SBB_MET, 0) AS DMD_SBB_CUR,       --当前SBB需求
            * (T1.DMD_SBB - IFNULL(T3.DMD_SBB_MET, 0)) * T1.MENGE AS DMD_COMP, --当前COMP需求
            * DMD_SBB_CUR - DMD_SBB_MET AS DMD_SBB_UNMET
            * MAX(SUP_COMP_USAGE) OVER(PARTITION BY DMD_ID, BOMID) AS SUP_SBB_MAX, --能齐套SBB数量  
                
              LEAST(SUP_SBB_MAX, DMD_SBB_CUR) AS DMD_SBB_MET --已满足需求  
              LEAST(SUP_SBB_MAX, DMD_SBB_CUR) * MENGE AS DMD_MET_FINAL  
                
              SUM(SUP_COMP_CONSUMED) AS SUP_COMP_CONSUMED--已消耗库存  
                
              SUP_COMP_USAGE --考虑用量后COMP库存（(初始为SUP_ORI/ MENGE）
            * 计算SUP_COMP_CONSUMED,  
              计算PR
            * 过滤没SUPPLY和全部需求已满足的DEMAND
            * 注意

              * ‍
          * 每循环2500次检查一次剩余需求是否还有库存可消耗

            * HAVING SUM(T1.SUP_ORI - IFNULL(T2.SUP_COMP_CONSUMED, 0)) = 0;
            * 从BOM_DMD中delate已经没有的库存
        * 6.Update Column

          * INSERT UD.CAL_CASE1_INV_DETAIL FROM MID
        * 7.计算计算每次PLAN后剩余SUPPLY

          * UPDATE "mrp.data::UD.CAL_CASE1_INV_DETAIL"

            T2.SUP_ORI - SUM(T1.SUP_COMP_CONSUMED) OVER(PARTITION BY T1.WERKS, T1.ITEM ORDER BY T2.BATCH_DMD) AS SUP_COMP_LEAVE
        * 8.扣减BOH,

          * 计算两种情况的SUP_COMP_LEAVE，得到LT_SUP_COMP_LEAVE
          * 遍历LT_SUP_COMP_LEAV，根据第二部计算的PR计算SUP_COMP_LEAVE，UPDATE CAL_CASE1_INV_DETAIL扣减BOH

            * 每次只更新满足条件的，DMD_ID最小的（优先级最大）
            * ‍
      * 主要输出
    * 3.2 库存消耗完则生成PR

      * 注意：3.1中通过统计
      * 统计需求

        * 第一种没满足

          * insert DMD_UNMET
          * DMD_SBB - SUM(DMD_SBB_MET) AS DMD_SBB_CUR,DMD_SBB - SUM(DMD_SBB_MET) AS DMD_FATHER  
            FROM "mrp.data::UD.CAL_CASE1_INV_DETAIL"  
            HAVING DMD_SBB - SUM(IFNULL(DMD_SBB_MET,0)) > 0;
        * 没走第一种

          * insert DMD_UNMET  
            REQQTY AS DMD_SBB,  
                       REQQTY AS DMD_SBB_CUR, REQQTY AS DMD_FATHER
      * 未满足的需求从BOM顶端一直拆到底部

        * insert CAL_CASE2_PR_DETAIL
        * 第一层

          * 原材料使用UI维护的采购比例拆分需求,非原材料的替换则均分需求

            * DMD_FATHER * USAGE * PROPORTION AS PR  
              FROM "mrp.data::UD.DMD_UNMET"  
              JOIN "mrp.data::UD.BOM_ORI_WITHOUT_BULK_P2"
            * 计算PROPORTION

              * --未维护比例则均分
              * --维护比例则加权平均
        * 其他层，遍历2-10层，逻辑类似

          * DMD_FATHER * USAGE * PROPORTION AS PR
          * T1.PR AS DMD_FATHER（T1.LVL = C_LVL - 1）
          * 计算PROPORTION--采购比例
        * update the dummy materials to real items

          * UPDATE "mrp.data::UD.CAL_CASE1_INV_DETAIL" T1  
                 SET PRODUCT（LIKE '%DUMMY%'）=T2.ROOT_ORI
          * UPDATE "mrp.data::UD.CAL_CASE2_PR_DETAIL" T1
    * 3.3 处理BULK
  * 4 生成FCST

    * 数据

      * Hub Stock and Inventory Report

        * All the reports will keep 001 and 030 version like APO. 001 version will consider the PDT/MOQ/MPQ, but 030 version will not consider PDT/MOQ/MPQ.
      * PART REPORT

        * 1. Gross Forecast: CATEGORY 为Forecas
          2. Gross Order: CATEGORY 为Order
          3. FCST_QTY: PR（MRP result for the components）
          4. PO: Open PO（the Open PO Qty for the specific component.）
          5. Cum_Sup: FCST_QTY + PO
          6. BOH: onhand Inv
          7. VMI:
          8. Cum_Inv: BOH+VMI(Cumdelta 累积)
          9. TTL_Dmd: Gross Forecast+ Gross Order
      * PEGGING REPORT

        * ‍

          1. Item: Component
          2. To Item: SBB or Option

              Available Stock: BOH

              ‍
      * Bulk report
    * 过程-RPT_part_fcst_pegging

      * report 52个周的QTY from第三步结果  
        INSERT INTO "mrp.data::RPT.PART_FCST_PEGGING"  
        ITEM AS ITEM， PRODUCT AS TOITEM,

        FROM "mrp.data::UD.CAL_CASE1_INV_DETAIL"  
        PR AS QTY  
        UNION ALL FROM "mrp.data::UD.CAL_CASE2_PR_DETAIL"
    * 过程RPT_PART_FCST

      * 对照

        * KEY_FIGURE, 'Gross Forecast', 1, 'Gross Order', 2, 'FCST_QTY_ORI', 3, 'FCST_QTY',  
                                       4, 'PO_QTY', 5, 'BOH_ORI', 6, 'BOH', 7, 'VMI', 8, 'Cum_Inv', 9, 'Cum_SUP', 10,'TTL_Dmd',11)
        * BoH: LOI(Lenovo own inventory)<br />  Gross demand: -->The raw material gross demand before netting of the stock.  
            VMI inventory: SOI (supplier own inventory), consignment stocks under Lenovo warehouse.  
            Fcst Qty: MRP result for the components  
            Open PO Qty: the Open PO Qty for the specific component.  
            Cumdelta Inventory: the sum of the total inventory which available, BOH + VMI inventory.  
            Cumdelta Supply: the sum of the total supply, Fcst Qty + Open PO Qty

          ‍
      * 输出数据

        * "mrp.data::UD.PART_FCST_BYPART"

          * KEY_FIGURE(VMI or BOH)
          * W1-W52
          * SAFETY_DAYS
          * SAFETY_STOCK
        * "mrp.data::UD.PART_FCST_BYSUPPLIER"

          * SUPPLIER('Dummy' or 'X470' or ...)
          * W1-W52
          * MOQ(PRODUCT,SUPPLY)
          * MPQ(PRODUCT,SUPPLY)
          * PDT
          * QUOTA
      * 具体过程如下

        ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,BYPART,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
      * 2， Gross Forecat/Order

        * FCST QTY是"mrp.data::UD.CAL_CASE1_INV_DETAIL"与"mrp.data::UD.CAL_CASE2_PR_DETAIL" 的PR
      * 3,计算PR与安全库存

        * UPDATE "mrp.data::UD.PART_FCST_BYPART"
        * 根据QTY计算Safety Stock(SAFETY_STOCK =.NETTING_QTY)

          * Average daily demand (“Daily Going Rate”) = FCST in Horizon/Horizon = 1250 /30 = 43  
                Safety Stock = Safety Days’ Supply x Daily Going Rate = 8 x 43 = 344
          * ps:maintain a number rounded up by 5 workdays (equals to 1 week) in the Safety Stock Horizon
        * UPDATE "mrp.data::UD.PART_FCST_BYPART" T1  
               SET (T1.QTY) = (IFNULL(T1.QTY,0) + IFNULL(T1.SAFETY_STOCK,0))  
          where .. AND T1.BKT_ID = 1;
        * 第一周PR能COVER安全库存则保持不变否则用安全库存替换首周PR
      * 最终PR

        * PR should over MOQ and multiple the MPQ

                MOQ/MPQ at Product level has higher priority than supplier level
      * 6, Cum_SUP=FCST_QTY+PO_QTY

        * INSERT INTO "mrp.data::UD.PART_FCST_BYPART"
      * 7 库存INV

        * Cum_Inv=BOH+VMI
        * INSERT INTO "mrp.data::UD.PART_FCST_BYPART"
      * 7.1, 需求DMD

        * TTL_Dmd=Gross Forecast+Gross Order
      * 8 Final Report ByPart

        * W1..W52

        ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,SUPPLIER,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
      * 9 Get Supplier

        * --GROSS DEMAND/BOH/VMI是PLANT LEVEL  
          INSERT INTO "mrp.data::UD.PART_FCST_BYSUPPLIER"  
          FROM "mrp.data::UD.PART_FCST_BYPART"
        * 根据配额（quota）PR拆到SUPPLIER,没supplier的放DUMMYSUPPLIER
      * 10  PDT 计划交付时间

        * ||
          | --|
      * 11 MOQ/MPQ

        * moq是最小采购量  
           --MPQ是最小批量
      * PO

        * T2.POQTY_OPEN AS QTY_BYSUPPLIER,
      * SUP
      * DMD
      * INV
      * TTL_DMD
      * Final Report BySupplier

        * --不考虑PDT/MOQ/MPQ

          * 030' AS PLANNING_VERSION
        * --考虑PDT/MOQ/MPQ

          * '001' AS PLANNING_VERSION
      * for noncustomer

        * INSERT INTO "mrp.data::RPT.PART_FCST_BYSUPPLIER_NONCUS"

          where (T1.KEY_FIGURE) NOT IN ('PO_QTY', 'BOH', 'BOH_ORI', 'VMI','CUM_INV','CUM_SUP')
    * ‍
  * 5 commit to FR

    * from "mrp.data::UD.PART_FCST_BYSUPPLIER"
* 一些关系

  * LIFNR--SUPPLY
  * ITEM--MATNR(物料号)
  * NAME--ITEM
  * BOM_ORI.ROOT--product
  * ITEMGROUP.LOCATION -- P_IN_SITEID
  * P_IN_SITEID==werks
  * ITEM-MATNR--IDNRK
  * ·       MAST-MATNR (Material)

    ·       STPO-IDNRK (Component)
* 代码

  * ```undefined
    取这周的第一天
    SELECT ADD_DAYS(CURRENT_DATE,WEEKDAY(NOW())*-1) FROM DUMMY
    ```
* QA

  * 缩写含义问题：

    * ALPGR的数值代表什么
    * BOMID是如何计算的
  * 为什么创建MISC_LIST，将 MISC与SBB,OPT分开处理构建自己的BOM
  * ‍
  * 代码段

    * 取出供应不为0的

      * ```undefined
          SELECT WERKS, ITEM, SUP_COMP_LEAVE 
          FROM (SELECT M.*, ROW_NUMBER() OVER(PARTITION BY WERKS, ITEM ORDER BY SUP_COMP_LEAVE) AS RN 
          FROM "mrp.data::UD.CAL_CASE1_INV_DETAIL" M 
          WHERE M.WERKS = 'X470'
          AND SUP_COMP_LEAVE IS NOT NULL)
           WHERE RN = 1 
        ```
    * ```undefined

      2.1
      UPDATE "mrp.data::UD.BOM_ORI" BOM
           SET MENGE_PT_SPLIT = (SELECT MENGE_PT_SPLIT + (1 - MENGE_SUM) FROM (SELECT SUM(MENGE_PT_SPLIT) MENGE_SUM FROM "mrp.data::UD.BOM_ORI" WHERE WERKS = BOM.WERKS AND NAME = BOM.NAME AND ALPGR = BOM.ALPGR GROUP BY WERKS, NAME, ALPGR))
         WHERE WERKS = P_IN_SITEID
           AND ALPGR IS NOT NULL
           AND IFNULL(BESKZ,'X') <> 'F'
           AND NOT EXISTS(SELECT 1
                            FROM (SELECT SUM(MENGE_PT_SPLIT) MENGE_SUM FROM "mrp.data::UD.BOM_ORI" WHERE WERKS = BOM.WERKS AND NAME = BOM.NAME AND ALPGR = BOM.ALPGR)
                           WHERE MENGE_SUM = 1)
           AND "$rowid$" = (SELECT "$rowid$"
                              FROM (SELECT WERKS, NAME, ALPGR, "$rowid$", ROW_NUMBER() OVER(PARTITION BY WERKS, NAME, ALPGR) RN
      		                        FROM "mrp.data::UD.BOM_ORI"
      		                       WHERE WERKS = BOM.WERKS AND NAME = BOM.NAME AND ALPGR = BOM.ALPGR)
                             WHERE RN = 1); 
        COMMIT;
      ```
  * ‍
  * ```undefined
    2.2
    2.BOM中整枝都没有替代关系,则删掉这整枝BOM
    ```

## 问题日志

# PROJECT-BYTEDANCE

* 任务

  * 根据ui输入计算成品库存
* 数据

  * LT_PIG

    * WERKS;MATNR;GRPID;PRIORITY;PROPORTION
  * LT_GSM

    * LENOVO_PN;SUPPLIER;GSM
  * "ADDSC"."addsc.data::UD.DCG_ORI_COMMIT"

    * VENDOR_NAME--WERKS
  * "ADDSC"."addsc.data::UD.ByteDance_SIZING_RESULT"

    * QUERYID查询ID
    * PLANT--产地
    * PPN--物料
    * GSM--某种名字？
    * MEASURE in(COMMIT, SUPPLY_GAP,STOCK,DEMAND)
  * LT_BUCKET(6个月)

    * MONTH;MONTH_BEG;MONTH_END
  * LT_COM_SUP--统计stock

    * PLANT, MATNR, MONTH, STOCK
    * CATEGORY, --IN(STOCK, COMMIT)
  * LT_COMMIT--已确认订单

    * PLANT_ID;PART_NUMBER;WW_GSM_SC;PROC_ARRIVALS
    * SOURCE IN (DAILY,WEEKLY)
  * "ADDSC"."addsc.data::UI.ByteDance_SIZING_DMD"

    * QTY--需求数量
  * ‍
* 流程-bytedance

  * LT_PIG
  * LT_GSM
  * LT_BUCKET
  * ‍
  * 统计demand的qty

    * INSERT INTO "ADDSC"."addsc.data::UD.ByteDance_SIZING_RESULT"
  * 统计每个月demand的qty
  * 计算FGI

    * MERGE INTO "ADDSC"."addsc.data::UI.ByteDance_SIZING_DMD"
    * A.FGI = B.STOCK;
  * 计算Supply

    * stock

      * INSERT INTO "ADDSC"."addsc.data::UD.ByteDance_SIZING_RESULT"
    * COMMIT

      * INSERT INTO "ADDSC"."addsc.data::UD.ByteDance_SIZING_RESULT"  
        from LT_COM_SUP
  * 计算Supply GAP

    * 按月份循环
    * LT_DMD --MEASURE = 'STOCK'
    * LT_CMT-- MEASURE = 'COMMIT'
    * LT_ROLLING--MEASURE = 'Supply_GAP'
    * INSERT INTO "ADDSC"."addsc.data::UD.ByteDance_SIZING_RESULT"  
      'Supply_GAP' AS MEASURE,
  * UPDATE Calculate Demand

    * MERGE INTO "ADDSC"."addsc.data::UD.ByteDance_SIZING_RESULT"  
      WHERE T.MEASURE IN ('STOCK','COMMIT','Supply_GAP')

       A.MEASURE = 'Demand
    * DELETE FROM "ADDSC"."addsc.data::UD.ByteDance_SIZING_RESULT" T1  
      	 WHERE MEASURE = 'STOCK'
  * Update Completed FlG'  
    UPDATE "ADDSC"."addsc.data::UI.ByteDance_SIZING_DMD" T1  
        SET COMPLETED = 'X'
* 流程--bytedance_BOM

  * UPDATE "addsc.data::MID.SIZING_BOM"
  *  核心程序INITIAL已经计算好了FG-SBB的关系"addsc.data::MID.INITIAL_FG_FC_SBB"，其中DATA_FROM = 'LFO-SBB-SEO'就是字节的LFO-FC FIX MTM BOM(FG-FCSBB)

    ‍

    根据Step1搭建好的FG-SBB的level 1的BOM， 从ECC/S4取INHOUSE BOM， 继续扩展其他层次（从SBB层开始），当某分支有多层BOM都是F料时， 只展到第一层F料
* 流程--bytedance_supply_net

  * LT_PIG
  * LT_BUCKET
  * LT_COMP_SUP
  * PEGGING

    * 计算需求"addsc.data::MID.ByteDance_SIZING_PEGGING"  
      T1.QTY * T2.MENGE_PATH / T2.MENGE AS DMD_UPPER
    * ‍
  * MONTH1~MONTH6
  * 计算PRIORITY

    * ‍
  * ORIGINAL STOCK
  * ORIGINAL COMMIT
* 代码段

  * 1

    * ```undefined
      取前一行的ROLL_SUPPLY
      THEN T.DEMAND - FIRST_VALUE(T.ROLL_SUPPLY) OVER(PARTITION BY QUERYID, PLANT, ID, MONTH ORDER BY PRIORITY_PPN ROWS 1 PRECEDING)
      --对于组内的第一行取其自己的值
      ```

# PROJECT-MAP:PIG( ItemGroup)

* 先计算AIG(完全基于BOM的替代条件，生成ITEM GROUP), 再根据用户的修改计算PIG
* 数据

  * mrp.data::UD.PIG_I

    * PIG_I 指的是PIG Item，也就是PIG中每个PN的具体信息，包括priority和proportion；
  * mrp.data::UD.PIG_H

    * PIG_H 指的是PIG Header，主要是PIG组级别的信息，比如是否Lock。
  * mrp.data::UD.PIG_I_BK

    * 备份表
  * mrp.data::UD.PIG_H_BK

    * 备份表
* 1，AIG --遍历所有BOM下可替换的item计算AIG

  * 1,Calculate BOM Combination Statue

    * INSERT INTO "mrp.data::MID.MID_BOM_ORI"
    * DELETE OB STATUS MATERIAL
    * 检查用户输入是否合法
    * --COMBINATION STATUE, BOM  
      INSERT INTO "mrp.data::MID.BOM_COMB_STATUE"(WERKS,BOM,IDNRK,ALPRG,GRPID,GRMCH,ITMMT,COMST)
    * 删除只有一个替代料的BOM
  * 2 Calculate AIG

    * 对每一个INDRK循环

      * CALL "MRP"."mrp.procedures.pig::AIG_CAL"

        * INSERT INTO "mrp.data::MID.AIG_TMP"（IDNRK）
        * 循环 --有点像BFS

          * 寻找有与刚加入mrp.data::MID.AIG_TMP的IDNRK同样IDNRK的BOM-ALPRG.  将这个BOM-ALPRG中的其他IDNRK加入: LT_AIG
          * 结果保存INSERT INTO "mrp.data::MID.AIG_TMP"
      * UPDATE "mrp.data::MID.AIG" --生成AIGID
* 2，pig

  * 原只有L270，现在包括其他工厂
  * 1, 计算stock

    * IF L270:  
      INSERT INTO "mrp.data::MID.STOCK"(MATNR,WERKS,LOI_QTY,SOI_QTY)  
      FROM ATP.MRP.VT_MARD

      ELSE:  
      FROM PCDW.PUBLIC.MARD
    *  

      * 未LOCK的PIG下的PN找不到AIG，打删除标志：D

        * UPDATE "mrp.data::UD.PIG_I"
      * 原PIG无BOM, Deleted
      * UPDATE PROPORTION for PIG which has DELETED PN

        * UPDATE "mrp.data::UD.PIG_I" A  
               SET A.PROPORTION
  * 2 计算GRPID

    * 对New PIG(GRPID_LAST IS NOT NULL)计算GRPID

      * 计算LT_AIG_NEW =
      * UPDATE "mrp.data::MID.AIG" AIG  
        SET GRPID_END  
        FROM LT_AIG_NEW
    * 对Old PIG Split to New PIG计算GRPID
    * Old PIG计算GRPID

      * GRPID_END =GRPID_LAST
    * 对Combine PIG计算GRPID

      * 某替代集包含多个PIG的PN,这些PIG都是该替代集的子集，则删除旧的PIG, 按替代集新建PIG
      * 某个AIGID下有多个LAST VERSION PIGID，再check这些PIGID下的PN是否出现在其他的AIGID
  * 3 Create PIG Genaration Data

    * INSERT INTO  "mrp.data::MID.PIG_GENERATE  
      FROM "mrp.data::MID.AIG"
    * LOCK的PIG下的PN，没有AIG的也需要保留(如原PIG被合并，也需要考虑合并后的GRPID)

      * INSERT INTO  "mrp.data::MID.PIG_GENERATE"  
        FROM "mrp.data::UD.PIG_I"
    * 删除的PN需要更新到GENERATE  
        INSERT INTO  "mrp.data::MID.PIG_GENERATE"  
        FROM "mrp.data::UD.PIG_I"
  * 4 Update priority & proportion

    * 8种场景，[ISG LSSC PIG LOGIC PRD - 全球供应计划 - XPaas 汇合 (lenovo.com)](https://km.xpaas.lenovo.com/display/GSP/ISG+LSSC+PIG+Logic+PRD)
    * 计算New PIG
    * 计算存在LOCK的PIG  
        --PRIORITY: LOCK>UNLOCK>NEW PN<br />  --PROPORTION: REMAIN IN LOCK PIG
    * 计算UNLOCK PIG  
        --a. Exists New PN  
        --b. Not Exists New PN
    * UPDATE STAUS, FLAG, MESSAGE
  * 5 Create PIG

    * UPDATE TO RESULT TABLE

      * INSERT INTO "mrp.data::UD.PIG_I"
      * INSERT INTO "mrp.data::UD.PIG_H"

## 问题日志

* proporation有负数

  * pig_generate代码问题
* **grpid= 1000016870、LOCNO=L270、MATNR=SM17A06251、SM17A06243、SS17A30169 不应该存在；**

  * 分析：

# PROJECT - SST

* 架构

  * ​![image](assets/image-20230928114405-6hkwwwn.png)​
* 名词

  * LBP-I (internal)
  * LBP-e (external)
* config

  * **E070对应欧洲国家，X470对应NA LA，L270对应AP国家**
  * ​![image](assets/image-20230911105729-es5rbi0.png)​
* 数据

  * ​![image](assets/image-20230928114528-qusz7m6.png)​
  * MMR

    * ​![image](assets/image-20230928114804-kdhh280.png)​
  *  

    * "addsc.data::BAK.LFO_BOM" --LFO BOM
    * "addsc.data::BAK.CTO_CV_VK" -- CTO BOM
  * LBP回的配置会落到这

    * 包括工厂，地址，产品，数量
    * ADDSC.VT_LBP_LINEITEMSINFO  
      ADDSC.VT_LBP_LINEITEMSINFO_FEA  
      ADDSC.VT_LBP_LINEITEMSINFO_SUB_FEA
  * "ADDSC"."VT_S4_SEO_CTO_VK_MAPPING"--最新的LFO
* ‍

  * 1. 根据实际请求的核心参数包括：

        1. CTO/MTM + BU(REL/SMB)  + [CV LIST]
        2. 支持批量传入多组信息
    2. 输出处理逻辑为：

        1. 将MTM 通过尽可用库存进行冲减后剩余量使用SBB CMT回算各个site的最早齐套时间
        2. CTO无需冲减，直接使用CV mapping到SBB 进行齐套计算
        3. 选择各个site最早的齐套时间作为最优的ESD
        4. 不考虑EOL的影响
* CDP:D365

  *  

    * 数据流

      * 1. HANA 程序:  "ADDSC"."addsc.procedures.api::LBP_CONFIG"
        2. JAVA API ( 去前端取配置 ) ， CDP Alert  API
        3. HANA 程序: "ADDSC"."addsc.procedures.api::D365_REQUEST"
    * 输入写入"ADDSC"."addsc.data::IMP.DCG_D365_OPPORTUNITY";（QUOTATIONID，etc）  
      输出："ADDSC"."VT_ALERT_CTO" WHERE BU = 'ISG';
  * D365_REQUEST

    * 获得orderID

      * LT_REQID . BIG_ORDER_ID = T1.OPPORTUNITYID || T1.OPPORTUNITYPRODUCTID AS BIG_ORDER_ID  
                      FROM "ADDSC"."addsc.data::IMP.DCG_D365_OPPORTUNITY" T1);
    * 分为MTM与CTO

      * MTM

        * INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO"

          * OPPORTUNITYID AS BIDREQUESTID,  
            OPPORTUNITYPRODUCTID AS LINE_BIDREQUESTITEMID,  
            FROM "addsc.data::IMP.DCG_D365_OPPORTUNITY"
      * CTO（要取LBP配置）

        * INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO"

          * BIDREQUESTID = OPPORTUNITYID  
            LINE_BIDREQUESTITEMID = OPPORTUNITYPRODUCTID  
            FROM "addsc.data::IMP.DCG_D365_OPPORTUNITY" and LBP配置
        * INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO_FEA"  
          与上类似  
           BIG_ORDER_ID= OPPORTUNITYID
        * INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO_FEA"

          * BIG_ORDER_ID= OPPORTUNITYID  
            LINE_SUB_BIDREQUESTITEMID  LT_LBP_LINEITEMSINFO_SUB_FEA
    * INSERT INTO "ADDSC"."addsc.data::UD.DCG_SST_ORDER"--第一部分head  
      OPPORTUNITYID || LINE_BIDREQUESTITEMID as BIG_ORDER_ID  
      FROM "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO"

      * INSERT into"ADDSC"."addsc.data::UD.DCG_SST_ORDERLINE"--第二部分line 的 bidRequestItemId与line_sub 的bidRequestItemId （FG_QTY）

        * OPPORTUNITYID || LINE_BIDREQUESTITEMID as BIG_ORDER_ID,  
          LINE_QUANTITY as FG_QTY  
          BIDREQUESTID PARENT_ORDER_ID  
          **FROM** "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO" T1  
          INNER JOIN :LT_REQID T2  
          ON T1.SYS_MODIFIEDBY = T2.REQID;--ORDERID
        * BIG_ORDER_ID || LINE_BIDREQUESTITEMID as BIG_ORDER_ID  
          LINE_SUB_QUANTITY as FG_QTY,  
          **FROM** "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO_SUB_FEA"
      * INSERT into"ADDSC"."addsc.data::UD.DCG_SST_FCSBB"  （**对CTO,FC/FC_QTY来自_FEA与SUB_FEA, MTM的FC会在quotation中取**）

        * LINE_BIDREQUESTITEMID  AS ORDERLINE_ID  
          LINE_BIDREQUESTITEMID  AS PARENT_ ORDERLINE_ID  
          FROM "addsc.data::IMP.DCG_D365_LINEITEMSINFO_FEA")
        * LINE_SUB_BIDREQUESTITEMID AS ORDERLINE_ID  
          LINE_SUB_BIDREQUESTITEMID ORDERLINE_ID  
          FROM "addsc.data::IMP.DCG_D365_LINEITEMSINFO_SUB_FEA"

          * ‍
    * FOR REQID DO

      * CALL "ADDSC"."addsc.procedures.quotation::00_MAIN"(C_ID.REQID, P_OUT_EXITCODE0); --CHECK REQUEST PARAMETER
    * INSERT INTO "ADDSC"."addsc.data::API.C360_ALERT" (ESD)

      * from addsc.data::IMP.DCG_D365_OPPORTUNITY"

        INNER JOIN "ADDSC"."addsc.data::UD.DCG_SST_ORDER" T6
* LBP: NLBP

  * --与D365不同，addsc.data::UD.DCG_SST_FCSBB中FC从输入中获取,'X' as SBB
  * 数据：

    * "ADDSC"."addsc.data::IMP.DCG_NLBP_LINEITEMSINFO"

      * bidrequestid 对应quoteid  
        LINE_BIDREQUESTITEMID对应quotelineid
    * "ADDSC"."addsc.data::UD.DCG_SST_ORDERLINE"  
       BIG_ORDER_ID=bidrequestid  
       ORDERLINE_ID=LINE_BIDREQUESTITEMID

    ‍

    ‍
* Initial

  ## Initial

  list all BOM and calculate supply for PPN/SBB/FG level, to get a color responding to supply status

  * 概念

    * DTL: Detail
    * DCSC:Data Center Solution Configurator(Infrastructure Configurator)
    * PPN Specified Color

      * User can set color through UI ‘PPN Specified Color’ on DSCP

        Specified color rule:

        •No specified color in alternative group, then use original color

        •Both specified color and non-specified color in an alternative group, non-specified PPN uses the best specified color in this group

        Alter with PHANTOM,  do not take PHANTOM into consideration when calculate color
    * ALERT MESSAGE

      * ​![image](assets/image-20231010114607-j5unjrg.png)​
  * main

    * **DOS Target** : Reflect commodity safe stock level based on the consumption &purchasing LT &flexibility  
      **DGR**: Consider historic 6wks consumption and to go 6wks forecast to reflect the average daily requirement  
      **DOS** Target*DGR : Safety stock to cover the projected build requirement for a given cycle time  
        

      Supply healthy Index= Netted available DOS / DOS Target

      **Netted available DOS= (Stock- given range backlog +given range supply)/DGR
    * **Color Range**  
      Color(Gray/Yellow/Green) : Reflect the supply availability(under the given range) to front team based on the stock/backlog/coming supply status  
      对应字段：GRAY_NONEOL_LE_10等
    * CHECK_SEQ![image](assets/image-20230925160121-f0dtn5y.png)​
    * HOW TO CAL DOS(即DOS_CRITERIAQTY字段) AND CAL PPN COLOR

      * ​![image](assets/image-20230925164411-7nbdt37.png)​
    * SITE:L070/X470//U470/FLXH  
          1.Preprocess SBB BOM,exclude non- key SBB and bulk parts  
          2.Get netted supply from CTM  
          3.Get bottom up to SBB level supply bucket by bucket, and do part's reservation in the meanwhile ,netted part's supply rolling to next bucket  
          4.Get part's shipment,FCST  
          5.Calculate SBB color on 6 buckets  
          6.Process NPI,LTB,EOL,Long LT,Promotion WARNING  
          7.Conver SBB level supply to LFO,FC,OPTOIN level according to announce date withdraw date  
          8.Sent result to DCSC
  * 1.3 处理BOM

    * INSERT INTO "addsc.data::MID.INITIAL_0BKT"
  * 02 SUP_DC_INV

    * Obtain stock of each DC according to DC SITE+LGORT+COUNTRY (at below table), and deduct inventory that are sold but still in stock, then sum to MTM/OPTION+COUNTRY LEVELthe BTS/BTO

      Configuration table: SELECT * FROM "addsc.data::CONF.PARAMETER" WHERE PNAME = 'DC_INV'
  * 3.1 cal SBB supply  
    Calculation is by bucket. For each bucket and each SBB, SST calculates from bottom to top to get the available quantity of SBB( considering usage and common parts), then calculates from top to bottom to get the usage of each PPN (according to the proportion), and the rest parts are rolled into next bucket.

    * -- ITEM SUPPLY 

      * INSERT INTO "addsc.data::MID.INITIAL_SUP_FOR_ESD_F"
    * BTO物料直接给每个BUCKET DEFAULT值 88888888  
      UPDATE "addsc.data::MID.INITIAL_SUP_FOR_ESD_F"
    * 按BUCKET循环

      * case 1,2,3,4,5(不同类型的替代) 从最底层往上计算SBB最大COMMIT

        * INSERT INTO "addsc.data::MID.INITIAL_4DTL"（QTY_SUP,QTY_ORI, QTY_ROLLING, QTY_CAL, QTY_UPPERLVL,)  
              IFNULL(T3.QTY * T1.PCT_ITEM, 0) AS QTY_SUP-- IDNRK的SUPPLY  
              IFNULL(T2.QTY_UPPERLVL,(IFNULL(T3.QTY, 0) + IFNULL(T4.QTY_LEFT, 0)) * T1.PCT_ITEM) AS QTY_CAL --如果是IDNRK，那么就取本身供应与上一BUCKET的供应之和，如果不是，就取下一层的供应（QTY_LEFT由下一步计算）  
              SUM(MAP(IS_AVL, 'Y', GREATEST(QTY_CAL,0) / MENGE, 0)) OVER(PARTITION BY ROOT, NAME, WERKS,IFNULL(ALPGR, IDNRK), IS_AVL) AS QTY_BYGRP --替换关系  
              MIN(QTY_BYGRP) OVER(PARTITION BY ROOT, NAME, WERKS, IS_AVL) AS QTY_UPPERLVL,

      * 根据SBB最大COMMIT,从上往下反推最底层物料消耗数量  

        * UPDATE "addsc.data::MID.INITIAL_4DTL" X  
          SET (X.PCT_GRP --比例, X.QTY_CONSUMED, X.QTY_LEFT)  
              MAP(C_LVL2, 1, T2.QTY_CAL, IFNULL(T2.QTY_CONSUMED,0)) AS QTY_UPPERLVL --上层消耗  
              T1. QTY_CAL / SUM(T1.QTY_CAL)OVER(PARTITION BY T1. ROOT, T1.WERKS, T1.NAME, IFNULL(T1.ALPGR, T1.IDNRK)))) AS PCT_GRP, --计算拆分比例  
              PCT_GRP * QTY_UPPERLVL**MENGE AS QTY_CONSUMED --消耗
              QTY_SUP + Y.QTY_ROLLING - MAP(Y.ISLEAF, 1, Y.PCT_GRP * Y.QTY_UPPERLVL*MENGE, 0) AS .QTY_LEFT  当天供应+前天剩余-消耗作为剩余
    * --最终报表结果  
         INSERT INTO  "addsc.data::RPT.INITIAL_SBB_SUPPLY_DTL"
  * 3.2 cal FG supply

    * SBB SUPPLY  
      INSERT INTO "addsc.data::RPT.INITIAL_FCSBB_SUPPLY"
    * LFO/CTO SUPPLY  
      INSERT INTO "addsc.data::RPT.INITIAL_FCSBB_SUPPLY"  
      ITEMTYPE = 'LFO-SBB/OPT'
    * UPDATE FC
  * 4.1: cal SBB COLOR

    * 计算方法：

      * PPN COLOR

        * 计算DOS与DOS TARGET, 考虑special color
        * ​![image](assets/image-20231010164021-3u122rm.png)​
      * SBB COLOR

        * 1. PROMO does not consider alternate.

              As long as there is one PROMO in the SBB BOM, then this SBB is PROMO
          2. BTO/LLT/LT consider alternative group

          ​![image](assets/image-20231010163712-q8wp1az.png)​
    * 1，Bucket

      * INSERT INTO "addsc.data::MID.INITIAL_COLOR_BKT"
    * 2，SBB BOM

      * INSERT INTO "addsc.data::MID.INITIAL_COLOR_BOM"
    * 3:DGR
    * 4，Inventory/Supply

      * INSERT INTO "addsc.data::MID.INITIAL_SUP_FOR_COLOR_F"
    * 5:Part Detail

      * INSERT INTO "addsc.data::MID.INITIAL_PPN_DTL"
    * 6，Color Range

      * INSERT INTO "addsc.data::MID.INITIAL_COLOR_RANGE"
    * 7:FG-SBB BOM

      * INSERT INTO "addsc.data::MID.INITIAL_COLOR_BOM_DTL"
    * 8:PPN Color

      * INSERT INTO "addsc.data::MID.INITIAL_PPN_COLOR"  
        按BUCKET循环（是否可以不循环计算），根据DOS_CRITERIAQTY ， DOS_TARGET计算COLOR
      * UPDATE "addsc.data::MID.INITIAL_COLOR_BOM_DTL"
    * 9: SBB ColorSupply color calculation from PPN to FC/SBB to MTM

        1.PROMO does not consider alternate. As long as there is one PROMO in the SBB BOM, then this SBB is PROMO

      2. BTO/LLT/LT consider alternative group

      * 按BKT_ID与LVL循环，  
        INSERT INTO "addsc.data::MID.INITIAL_SBB_COLOR"  
        FROM addsc.data::MID.INITIAL_COLOR_BOM_DTL"
      * 先计算某替代组或IDNRK的COLOR，再计算这一层的COLOR（COLOR_ID: 0, 'red', 1, 'orange', 2, 'gray', 3, 'yellow', 4,'green', 5, 'blue'）
  * 4.1 改进
  * 4.2 CAL ALERT

    * :Color Config  
      INSERT INTO "addsc.data::MID.CONF_COLOR"
    * SBB Alert(Normal SBB)

      * INSERT INTO "addsc.data::RPT.INITIAL_COLOR_DTL"  
        CHECK_SEQ  
        FROM "addsc.data::MID.INITIAL_SBB_COLOR"
    * LFO COLOR

      * INSERT INTO "addsc.data::RPT.INITIAL_COLOR_DTL"  
        CHECK_SEQ  
        FROM "addsc.data::RPT.INITIAL_COLOR_DTL"  
                                   WHERE WERKS = P_IN_SITEID  
                                     AND ITEMTYPE = 'LFO'
    * FINAL DATE

      * INSERT INTO "addsc.data::RPT.INITIAL_COLOR_ALL"  
        FROM "addsc.data::RPT.INITIAL_COLOR_DTL"
  * 5 SEND DCSC "addsc.data::RPT.INITIAL_COLOR"

    * INSERT INTO "addsc.data::RPT.INITIAL_COLOR"
    * ‍
  * 6 backup

    * ‍
    * 清理历史记录

      * DELETE FROM "addsc.data::UD.DCG_SST_ORDER"     WHERE MFG_PLANT = P_IN_SITEID AND SYS_CREATE_DATE <= ADD_DAYS(CURRENT_DATE, -30);  
          DELETE FROM "addsc.data::UD.DCG_SST_ORDERLINE" WHERE MFG_PLANT = P_IN_SITEID AND SYS_CREATE_DATE <= ADD_DAYS(CURRENT_DATE, -30);  
          DELETE FROM "addsc.data::UD.DCG_SST_FCSBB"     WHERE MFG_PLANT = P_IN_SITEID AND SYS_CREATE_DATE <= ADD_DAYS(CURRENT_DATE, -30);
* quotation

  ## quotation

  check DC inventory whether it can satisfy sales quantity return color and ESD

  * 总体逻辑

    * 根据order算到SBB级别的SUPPLY , 计算出ESD与color ,再得到order级别的ESD，

      1. 计算SBB的CTB，选择最差的SBB CTB作为MTM的CTB时间
      2. ESD = CTB + 工厂交货提前期（MFG LT）
      3. ESD日期精确到天
    * 说明

      1. 如果库存能满足，则ESD为当前时间，
      2. 如果MTM同时在两个工厂可做，物料by Site跑，算出LCFC ESD，及X420 ESD，选ESD更好的作为此MTM ESD；
      3. 工厂交货提前期（MFG LT）设定为x天
      4. 如果ESD计算结果为9999-12-31，说明该MTM最缺的SBB在未来13周的供应均无法满足需求数量；
      5. Open SO，PASS BTC Dummy SO 在CPSP中已被扣减
      6. ORDER  
          ORDERLINE -- FG  
          FCSBB -- FC,SBB（FC like BP55 SBB LIKE SBBxxxxx）
  * 1 ,CHECK --CHECK REQUEST PARAMETER

    * --找到PLANT  
      UPDATE "addsc.data::UD.DCG_SST_FCSBB"  
      "addsc.data::UD.DCG_SST_ORDERLINE"  
      "addsc.data::UD.DCG_SST_ORDER"
    * 循环

      * ITEMTYPE
      * IF SUBSTR(P_IN_REQID, 1, 4) = 'CPQ1' OR SUBSTR(P_IN_REQID, 1, 3) = 'LBP' OR SUBSTR(P_IN_REQID, 1, 4) = 'NLBP' OR SUBSTR(P_IN_REQID, 1, 4) = 'DCSC' OR SUBSTR(P_IN_REQID, 1, 4) = 'D365' THEN

        * CTO （CTO在此取SBB）  
          --若FC不在物料主数据（MMR）里存在会过滤掉

          * 计算REQUIRED_QTY, 获得brand等
        * MTM（MTM在此取FC, SBB）<br />      --重跑时需先删掉LFO-SBB

          * --1.LINE有下层则LINE不计算,LINE没下层的LFO要拆到SBB  
                  --2.SUBLINE层LFO拆到SBB,SBB.REQUIRED_QTY=LINE.FG_QTY*SUBLINE.FG_Q
      * IF SUBSTR(P_IN_REQID, 1, 3) = 'LMS'
      * IF SUBSTR(P_IN_REQID, 1, 4) = 'CPQ3' --只传LFO
      * 处理EOW>CURRENT_DATE的FG,这种不计算直接返回3999+空颜色和描述
    * 更新Brand

      * UPDATE "addsc.data::UD.DCG_SST_ORDERLINE"
  * 2, FG_FC_SBB--FC转换成SBB

    * DC INV

      * 取DC INV

        *  

          * UPDATE "addsc.data::UD.DCG_SST_ORDERLINE"
          * OFFERINGTYPE IN('OPTION', 'MTM');
      * 判断DC INV是否能完全满足('1_DC_INV' AS DC_FLAG)
      * 能DC INV满足或者第三方采购的LFO要删掉SBB数据
    * FG-FC-SBB

      * INSERT INTO "addsc.data::MID.QUOTATION_1FCSBB"  
        ROW_NUMBER() OVER(ORDER BY BIG_ORDER_ID, ORDER_ID, ORDERLINE_ID, T1.MFG_PLANT, T1.MFG_PLANT_SPECIAL, FG_PARTNUMBER, FC_SBB_ID, FC, SBB, FG_QTY) AS CAL_ID,--不同FC下可能有相同的SBB  
        IFNULL(PARENT_FG_QTY, 1) * FG_QTY AS  QTY --REQUIRED_QTY  
        FROM "addsc.data::UD.DCG_SST_FCSBB"
      * --OPTION  
        INSERT INTO "addsc.data::MID.QUOTATION_1FCSBB"  
        ROW_NUMBER() OVER(ORDER BY BIG_ORDER_ID, ORDER_ID, ORDERLINE_ID, T1.MFG_PLANT, T1.MFG_PLANT_SPECIAL, FG_PARTNUMBER, FC_SBB_ID, FC, SBB, FG_QTY) AS CAL_ID, FG_PARTNUMBER AS FC, FG_PARTNUMBER AS SBB,  
        FROM "addsc.data::UD.DCG_SST_FCSBB"
  * 3, SBB_SUPPLY --计算SBB CTB , FG CTB

    * GET SBB SUPPLY FROM INITIAL

      * INSERT INTO "addsc.data::MID.QUOTATION_3SBBSUP"
    * CAL QUOTATION SBB SUPPLY

      * 按CAL_ID循环

        * 按BUCKET循环（状态为UPDATE,即需求尚未满足）

          * 计算每个BUCKET的SUP
          * INSERT INTO "addsc.data::RPT.QUOTATION_SBB_SUPPLY"
          * UPDATE  "addsc.data::MID.QUOTATION_3SBBSUP"
    * 其他情况：INSERT INTO "addsc.data::RPT.QUOTATION_SBB_SUPPLY"

      * SBB status为‘BULK’
      * 为完全满足DMD与没有供应
  * 4, COLOR --计算SBB COLOR, 初始FG CTB

    * 1.Get the max(CTB) of all SBB under the CTO or MTM as its FG level’s CTB.

      * SBB直接计算出最终CTB和初始COLOR. FG计算出初始CTB,下面考虑CAPACITY/LEADTIME计算最终CTB和初始COLOR

        * INSERT INTO "addsc.data::RPT.QUOTATION_COLOR"  
          --SBB  
          MAX(MAP(IFNULL(REASON, 'X'), 'ALL BULK/NONKEY', CURRENT_DATE, SUPDATE)) AS ORIG_CTB,--SBB下层全是BULK或者NONKEY,则不参与FG COLOR计算/这种SBB CTB给当前天  
          GROUP BY ...FG, SBB  
          --FG  
          'X' AS SBB, 'X' AS FC, MAX(SUPDATE) AS ORIG_CTB  
          GROUP BY ...FG
    * 2.Consider workday and capacity（工厂对MACHINE_TYPE的产能）

      * INSERT INTO "addsc.data::MID.QUOTATION_WORKDAYS"  
        INSERT INTO "addsc.data::MID.QUOTATION_CAPACITY"--考虑workday  
            FROM "addsc.data::UD.DCG_CAPACITY",      "addsc.data::MID.QUOTATION_WORKDAYS"
      * 循环计算FG CTB

        * 对每个CAL_ID  --ORIG_CTB从小到大

          * 考虑capacity计算CTB
          * 循环

            * UPDATE "addsc.data::RPT.QUOTATION_COLOR" --只更新一次  
                         SET CTB = V_CTB
            * **UPDATE &quot;addsc.data::MID.QUOTATION_CAPACITY&quot;--冲减CAPACITY**
    * 3 Consider MFG lead time得到ESD.

      * CTB考虑工作日和MFG_LEADTIME（MFG_LEADTIME会因为工作时间延长）后得到ESD,然后ESD和SS_DATE取最大值作为最终ESD,然后得到GAP_DAY=ESD-CTB
      * FC,SBB ESD=CTB+GAP_DAY
    * 4 SET COLOR --FG’s color

      * After step 3, use final CTB to get FG’s color. From config table get CTO or MTM’s N, M value by machine type. Use FG’s CTB minus current date to get its weeks it can available, If > M weeks, then set it to gray, if <N weeks, set it to green. If M< and >N, then set to yellow.
  * 5, ALERT_PROCESS --计算ORDER LEVEL COLOR

    * 1_DC_INV : ESD=CURRENT_DATE（'FG' AS COLOR_LVL)

       2_LOCAL_PURCHASE: ESD=CURRENT_DATE + PURCHASE_LT（'FG' AS COLOR_LVL)
    * IF SUBSTR(P_IN_REQID, 1, 3) = 'LMS'

      * SUBLINE最坏的ESD要推到LINE上（'FG' AS COLOR_LVL)
      * --取LINE层最坏ESD作为Header ESD,不考虑SUBLINE ('ORDER' AS COLOR_LVL)
    * ELSE--取最大的FG ESD

      * FROM "addsc.data::RPT.QUOTATION_COLOR"  
                        WHERE COLOR_LVL = 'FG'
  * 6, RESPONSE

    * --FC-SBB  
      UPDATE "addsc.data::UD.DCG_SST_FCSBB"  
      SET SBB_COLOR  
      JOIN "addsc.data::RPT.QUOTATION_COLOR"  
      JOIN "addsc.data::BAK.INITIAL_COLOR_ALL"
    * --ORDERLINE  
      UPDATE "addsc.data::UD.DCG_SST_ORDERLINE"
    * --ORDER  
      UPDATE "addsc.data::UD.DCG_SST_ORDER"  
      SET ORDER_COLOR  
      --LMS    :X认为是warranty,LINE层是X且有SUBLINE的已经更新成NEW_LFO,非X的参与HEADER计算  
       --CPQ/LBP:不会有X的,OFFERINGTYPE不是MTM/CTO/OPTION值的表示没主数据  
      --LMS只考虑LINE层最坏颜色,不考虑SUBLINE层  
        -CPQ/LBP考虑LINE和SUBLINE  
      ​![image](assets/image-20230908151718-sf99ys2.png)​
* qa

  * FEA
  * ‍
* quotation改进

  * as is: 每个REQID都要执行一遍quotation
  * to be: 按SOURCE计算目前REQID的ESD

    * 调用quotation_batch前建中间表MID.QUOTATION_BATCH_REQID， 记录需要计算ESD的REQID

      ```sql
      MID.QUOTATION_BATCH_REQID =
      SELECT BIG_ORDER_ID,
      TRIM('D365' || "ADDSC"."addsc.data::SEQ_API".NEXTVAL) AS REQID
      FROM (SELECT DISTINCT T1.OPPORTUNITYID || T1.OPPORTUNITYPRODUCTID AS BIG_ORDER_ID
      FROM "ADDSC"."addsc.data::IMP.DCG_D365_OPPORTUNITY" T1);
      ```
    * 调用quotation_batch, 改传参REQID为SOURCE

      ```sql
      CALL "ADDSC"."addsc.procedures.quotation_batch::00_MAIN"('D365', P_OUT_EXITCODE0);
      ```
    * 执行quotation_batch，计算ESD

      ```sql
      原条件：IF SUBSTR(P_IN_REQID, 1, 3) = 'D365'改为：IF P_IN_SOURCE = 'D365'

      修改计算与更新数据的方式，每步计算出每个REQID的DC_INV, SUP, CTB, ESD，COLOR等
      每步计算需判断：
      WHERE T1.SOURCE = P_IN_SOURCE
      AND EXISTS(SELECT 1 FROM MID.QUOTATION_BATCH_REQID T2
      	   WHERE T2.REQID = T1.REQYID）;
      ```
  * 建表：

    * ```sql
      CREATE TABLE "ADDSC"."addsc.data::MID.QUOTATION_BATCH_REQID" (
        REQID VARCHAR(200),
        BIG_ORDER_ID VARCHAR(1000)
      );

      SELECT * FROM "ADDSC"."addsc.data::MID.QUOTATION_BATCH_REQID"
      ```
  * quotation.main(P_IN_REQSOURCE)--输入source 如D365

    * ‍
  * 1check(P_IN_SOURCE)

    * 1，SOURING PLANT

      * REQ SOURCE计算SOURING PLANT  
        MERGE "addsc.data::UD.DCG_SST_ORDER"  
        MERGE "addsc.data::UD.DCG_SST_ORDERLINE"  
        MERGE "addsc.data::UD.DCG_SST_FCSBB"  
        USING "addsc.data::CONF.SOURCING_PLANT"  
        ON CPQ_GEO, ELOIS_COUNTRYCODE=GEO, COUNTRY

        WHERE .SOURCE = P_IN_REQSOURCE

        AND EXISTS(SELECT 1  
        		                       FROM MID.LT_REQID T2  
        		                      WHERE T2.REQID = T1.REQYID
    * 2， ITEMTYPE

      * UPDATE "addsc.data::UD.DCG_SST_ORDERLINE"
    * 3, FCSBB  
      IF P_IN_REQ = 'D365'
    * 4, 处理EOW>CURRENT_DATE的FG,这种不计算直接返回3999+空颜色和描述  
      UPDATE "addsc.data::UD.DCG_SST_ORDERLINE" T1  
           SET T1.OFFERINGTYPE = T1.OFFERINGTYPE || '_NPI'  
      WHERE T1.OFFERINGTYPE IN ('MTM', 'OPTION')  
           AND T1.EOW > CURRENT_DATE;
  * 3FG_FC_SBB

    * DC_INV  
      UPDATE "addsc.data::UD.DCG_SST_ORDERLINE" T1  
             SET (T1.DC_INV)
    * 判断DC INV是否能完全满足
    * 能DC INV满足或者第三方采购的LFO要删掉SBB数据

      * DELETE FROM "addsc.data::UD.DCG_SST_FCSBB"  
        WHERE .SOURCE = P_IN_REQSOURCE
    * INSERT INTO "addsc.data::MID.QUOTATION_1FCSBB"  
            (REQID, GEO, BIG_ORDER_ID, ORDER_ID, ORDERLINE_ID, COUNTRY, PLANT, PLANT_SPECIAL, FC_SBB_ID, FG, FG_QTY,  
             PARENT_FG_QTY, FC, SBB, QTY, MACHINE_TYPE, MFG_LEAD_TIME, BESKZ, SBB_OR_OPT, CAL_ID, BRAND)

      ROW_NUMBER() OVER(PARTITION BY REQID ORDER BY BIG_ORDER_ID, ORDER_ID, ORDERLINE_ID, T1.MFG_PLANT, T1.MFG_PLANT_SPECIAL, FG_PARTNUMBER, FG_QTY) AS CAL_ID--按REQID分组计算CAL_ID, 之后再计算SBB SUPPLY时按CAL_ID循环计算每个REQID的SBB SUPPLY
  * 4SBB_UPPLY

    * SBB SUPPLY

      * INSERT INTO "addsc.data::MID.QUOTATION_3SBBSUP"

        FROM "addsc.data::BAK.INITIAL_SBB_SUPPLY"

        JOIN MID.LT_REQID
      * 循环

        * 根据SBB的SUPPPLY，按CAL_ID BAT_ID循环更新每个REQID的SUPQTY, SUPDATE
  * 4CAL_COLOR

    * 对每个REQID,SBB直接计算出CTB和COLOR. FG计算出初始CTB,
    * SBB直接计算出最终CTB和初始COLOR. FG计算出初始CTB,
    * 下面考虑CAPACITY计算FG CTB

      * --按CAL_ID循环，每轮计算所有REQID的FG,CTB
      * 每轮循环更新CAPACITY
    * 考虑工作日和MFG_LEADTIME（MFG_LEADTIME会因为工作时间延长）后得到ESD,
  * 问题

    * 01_check

      * --2.SPECIAL SOURCING
    * 02_FCSBB

      * DC_INV表中COUNTRY是简写，而ORDERLINE中MTM的COUNTRY是全称

## 问题日志

* **CDP和LBP-I上同样的MTM显示ESD不同的问题**

  * ISG在LFO Fully Set Up的情况下，LBP-I 仍然会给SST发CTO+FC，因此能够计算出ESD；

    CDP给我们的Product是MTM，SST查不到对应的FC，没法算出来ESD。
  * 改进：

    * 1. LFO  系统有FIX BOM ,  LFO-FC-SBB， 这种目前没问题，可以不需要用LBP-I的CTO配置来计算
      2. LFO  系统没有该LFO的FIX BOM, 需要用LBP-I返回的LFO-CTO-FC的配置来计算ESD  -- 待做
    * D365:

      * 取LBP-I返回的ORI_CTO不为空的MTM：LT_LBP_MTM_ORICTO
      * 除了没有BOM但是有ORI_CTO的MTM: INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO"
      * 对所有CTO：INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO"
      * 对没有BOM但是有ORI_CTO的MTM: INSERT INTO ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO"  
        *itemtype 设为CTO*  
        ORI_CTO 设为LINE_PRODUCT
      * 对MTM(LBP返回了ORICTO)：INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO_FEA"  
        INSERT INTO "ADDSC"."addsc.data::IMP.DCG_D365_LINEITEMSINFO_SUB_FEA"
* 问题：CALL "ADDSC"."addsc.procedures.Initial::98_CLEAR_DATA"(P_IN_SITEID, :CLEAR_TAB, P_OUT_EXITCODE1)时的锁竞争问题

  * 问题分析：

    * 报错：EVENT_MSG  
      131ERROR MESSAGE@@@transaction rolled back by lock wait timeout: "ADDSC"."addsc.procedures.Initial::98_CLEAR_DATA": line 36 col 7 (at pos 1962): Lock-wait time out exceeded [OWNER=8438212906, TYPE=OBJECT_LOCK, CURRENT_MODE=INTENTIONAL_EXCLUSIVE, REQUESTED_MODE=EXCLUSIVE]
    * 分析：一个用户调用04_CAL_1COLOR->98_CLEAR_DATA时，另一个用户正在执行04_CAL_1COLOR。在04_CAL_1COLOR中，对表'addsc.data::MID.INITIAL_SBB_ COLOR' 使用DML语句INSERT，以**INTENTIONAL EXCLUSIVE模式锁定表，**98_CLEAR_DATA中使用DDL语句ALERT TABLE请求以**​ EXCLUSIVE模式锁定表，这在HANA中是不允许的。**
  * 解决：  
    1，设置分区锁**（Partition-Level Locks）**

    ```sql
    BEGIN
      LOCK TABLE "addsc.data::MID.INITIAL_SBB_COLOR" PARTITION (P_IN_SITID) IN EXCLUSIVE MODE;
      COMMIT;
    END;
    ```

    当前HANA数据库版本为2.00，经测试不支持分区锁，该方法不可行

    2，**在HANA中允许多个事务以 INTENTIONAL EXCLUSIVE 模式锁定同一表。**因此可以在04_CAL_1COLOR中不调用98_CLEAR_DATA，直接使用DML语句  
    ​`DELETE FROM "addsc.data::MID.INITIAL_SBB_COLOR"  WHERE WERKS = P_IN_SITEID;`​​获得表上的**​ INTENTIONAL EXCLUSIVE锁**，以此避免**INTENTIONAL EXCLUSIVE与 EXCLUSIVE的冲突**

    ```sql
    DELETE FROM 'addsc.data::MID.INITIAL_COLOR_BKT'        WHERE WERKS = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_COLOR_BOM'        WHERE WERKS = P_IN_SITEID;  
    DELETE FROM 'addsc.data::MID.INITIAL_COLOR_RANGE'      WHERE PLANT = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_DGR'              WHERE SITEID = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_INV_SUP'          WHERE SITEID = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_SUP_FOR_COLOR_F'  WHERE WERKS = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_PPN_DTL'          WHERE SITEID = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_COLOR_BOM_DTL'    WHERE WERKS = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_PPN_COLOR'        WHERE WERKS = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_SBB_COLOR'        WHERE WERKS = P_IN_SITEID;
    DELETE FROM 'addsc.data::MID.INITIAL_FCST_52W'         WHERE SITEID = P_IN_SITEID;
    ```

    3,  程序结构调整  
    "addsc.data::MID.INITIAL_SBB_COLOR"表中主要是L270的数据，考虑分为两个表，一个表只存L270的数据，另一个表存其他数据

# PROJECT-DATA_MERGE

* ASN 

  * 概念

    * ASN --预交货通知
    * PO - 产品订单
    * SA - Scheduling Agreement采购协议
    * STO --存储单（入出库单）
  * 数据

    * ATP.ADDSC.VT_ASN_VIEW -- SCC ASN
    * "ADDSC"."addsc.data::IMP.DCG_ORI_ASN" --BSR ASN
    * "ADDSC"."addsc.data::UD.DCG_ORI_ASN" --report表
    * "ADDSC"."addsc.data::BAK.DCG_ORI_ASN"--备份
  * 步骤

    * PLANT对应的所有别名及本身: TAB_PLANT_ID
    * Latest ASN Data

      * LT_ASN  
        FROM "ADDSC"."addsc.data::IMP.DCG_ORI_ASN"--以BSR为准  
        FROM ATP.ADDSC.VT_ASN_VIEW
      * V_ASN_LOI
      * V_ASN_SOI
    * LOI data

      * UPDATE "ADDSC"."addsc.data::UD.DCG_ORI_ASN"
      * INSERT INTO "ADDSC"."addsc.data::UD.DCG_ORI_ASN"
    * SOI data
    * JYKJ data
    * BACKUP DATA

      * "ADDSC"."addsc.data::BAK.DCG_ORI_ASN"

# QA

*  

  * BYTEDANCE

    * ‍
  *  

    * 新功能开发的流程（提交，版本控制，测试等）
    * 处理报错（debug, 还是根据物料号检查表中的记录)

      ‍

      ‍

‍
